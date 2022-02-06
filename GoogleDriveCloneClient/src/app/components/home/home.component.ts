import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Breadcrumb, IBreadcrumb } from 'src/app/models/breadcrumb';
import { IFileOrFolder } from 'src/app/models/fileOrFolder';
import { Pagination } from 'src/app/models/pagination';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { FileOrFolderService } from 'src/app/_services/file-or-folder.service';
import { GoogleDriveService } from 'src/app/_services/google-drive.service';
import { PushDataBreadcrumbService } from 'src/app/_services/push-data-breadcrumb.service';
import { SharedService } from 'src/app/_services/shared.service';
import { NewFolderComponent } from '../modals/new-folder/new-folder.component';
import { RenameComponent } from '../modals/rename/rename.component';
import { SharedToUserComponent } from '../modals/shared-to-user/shared-to-user.component';
import { MovetoComponent } from '../moveto/moveto.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hiddenProcessUploadFile = true;
  data: IFileOrFolder[] = [];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;
  @ViewChild('popover') popover: MovetoComponent;

  constructor(private googleDriveService: GoogleDriveService,
    private breadcrumb: PushDataBreadcrumbService,
    private confirmService: ConfirmService,
    private modalService: BsModalService,
    private fileOrFoler: FileOrFolderService,
    private toastr: ToastrService,
    private shared: SharedService) {}

  ngOnInit(): void {
    this.createShortUrlForm();
    this.loadData();

    this.fileOrFoler.fileOrFolderRename$.subscribe(data=>{
      let temp = this.data.find(x=>x.fullPath === data.oldFullPath);
      if(temp){
        temp.name = data.name;
        temp.fullPath = data.fullPath;        
      }
    })

    this.fileOrFoler.newFolder$.subscribe(data=>{
      this.data.push(data);
      this.toastr.success('Add new folder success');
    })

    this.fileOrFoler.folderOrFileMoving$.subscribe(fullPath=>{
      this.data = this.data.filter(x=>x.fullPath !== fullPath);
      this.toastr.success('Moving file or folder success');
    })

  }

  private loadData(){
    this.googleDriveService.getFileOrFolder(this.pageNumber,this.pageSize).subscribe(res=>{
      this.data = res.result;
      this.pagination = res.pagination;
    })
  }

  onScroll() {
    if(this.pagination){
      if(this.pageNumber < this.pagination.totalPages){
        //this.path = fullPath; tai doubleClick(), get tu thu muc con
        if(this.path){          
          this.pageNumber +=1;
          this.googleDriveService.getFileOrFolder(this.pageNumber,this.pageSize, this.path).subscribe(res=>{
            this.data.push(...res.result);
            this.pagination = res.pagination;
          })
        }else{
          //get thu muc root khi user dang ky luu trong db
          this.pageNumber +=1;
          this.googleDriveService.getFileOrFolder(this.pageNumber,this.pageSize).subscribe(res=>{
            this.data.push(...res.result);
            this.pagination = res.pagination;
          })
        }        
      }
    }    
  }

  path: string = '';//luu path lai de phan trang onScroll() event

  doubleClick(fullPath: string, name: string){
    this.path = fullPath;
    this.pageNumber = 1;
    this.googleDriveService.getFileOrFolder(this.pageNumber,this.pageSize, fullPath).subscribe(res=>{
      this.data = res.result;
      this.pagination = res.pagination;
      //phan phoi message to Breadcrumb component
      this.breadcrumb.DataBreadcrumb = new Breadcrumb(name, fullPath);
    })
  }

  showProcessUploadFile(){
    this.hiddenProcessUploadFile = !this.hiddenProcessUploadFile;
  }

  //event from Breadcrumb
  getItemMode(event: IBreadcrumb){
    this.doubleClick(event.fullPath, event.name);
  }

  deleteFileOrFolder(item: IFileOrFolder){
    this.confirmService.confirm().subscribe(isDelete=>{
      if(isDelete){
        this.googleDriveService.deleteFileOrFolder(item).subscribe((res: IFileOrFolder)=>{
          this.data = this.data.filter(x=>x.fullPath !== res.fullPath);
        })
      }
    })
  }
  
  bsModalRef?: BsModalRef;

  renameModalWithComponent(item: IFileOrFolder) {
    const initialState: ModalOptions = {
      backdrop: true,
      ignoreBackdropClick: true,   
      initialState: {
        item: item       
      }
    };
    this.bsModalRef = this.modalService.show(RenameComponent, initialState);
  }

  newFolderModalWithComponent() {
    const initialState: ModalOptions = {
      backdrop: true,
      ignoreBackdropClick: true,   
      initialState: {
        parentPath: this.path       
      }
    };
    this.bsModalRef = this.modalService.show(NewFolderComponent, initialState);
  }

  sharedToUserWithComponent(item: IFileOrFolder) {
    const initialState: ModalOptions = {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        item       
      }
    };
    this.bsModalRef = this.modalService.show(SharedToUserComponent, initialState);
  }

  moveFileOrFolder(item: IFileOrFolder){
    this.popover.show();
    this.popover.Source = item;
  }

  shortForm: FormGroup;

  createShortUrlForm() {
    this.shortForm = new FormGroup({
      url: new FormControl('', [Validators.required])
    });
  }

  onSubmitShortUrl(){  
    this.path = '';    
    if(this.shortForm.value){    
      this.shared.getShortUrl(this.pageNumber, 
        this.pageSize,
        this.shortForm.value.url).subscribe(res=>{
        this.data = res.result;
        this.pagination = res.pagination;
        this.path = res.parentPath;
      })    
    }
  }

  upload$: Subscription;
  maxPercent = 100;// 100%
  //selectedFiles?: FileList;
  progressInfos: any[] = [];

  upload(files) {
    this.hiddenProcessUploadFile = false;
    this.progressInfos = [];   
    //this.selectedFiles = files;
    for (let i = 0; i < files.length; i++) {
      this.tienHanhUpload(i, files[i]);
    }          
  }

  tienHanhUpload(index: number, file: File){
    this.progressInfos[index] = { value: 0, fileName: file.name };
    if(file){      
      const formData = new FormData();
      formData.append(file.name, file);
      this.upload$ = this.googleDriveService.uploadFiles(this.path, formData).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[index].value = Math.round(this.maxPercent * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            //console.log(event.body.message);
          }      
          if(event.body){
            console.log(event.body);
            this.toastr.success('Up load file success');
          }          
        },
        error: (err: any) => {
          console.log(err);
          this.progressInfos = [];

          if (err.error && err.error.message) {          
            this.toastr.error(err.error.message);
          } else {
            this.toastr.error('Could not upload the file!');          
          }
        }
      })
    }
  }

  cancelUpload(){
    this.upload$.unsubscribe();
  }

}
