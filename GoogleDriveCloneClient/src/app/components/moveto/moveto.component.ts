import { Component, OnInit, ViewChild } from '@angular/core';
import { IFileOrFolder } from 'src/app/models/fileOrFolder';
import { Pagination } from 'src/app/models/pagination';
import { Stack } from 'src/app/models/stack';
import { FileOrFolderService } from 'src/app/_services/file-or-folder.service';
import { GoogleDriveService } from 'src/app/_services/google-drive.service';

@Component({
  selector: 'app-moveto',
  templateUrl: './moveto.component.html',
  styleUrls: ['./moveto.component.css']
})
export class MovetoComponent implements OnInit {
  @ViewChild('pop', { static: true }) popover: any;
  pageNumber = 1;
  pageSize = 5;
  data: IFileOrFolder[] = [];
  pagination: Pagination;
  fullPath = '';
  stack = new Stack<IFileOrFolder>();
  selectedItem: IFileOrFolder;

  constructor(
    private googleDrive: GoogleDriveService,
    private folderOrFile: FileOrFolderService) { }

  ngOnInit(): void {
    console.log(this.popover);// static chay o ham nay ko loi
    this.getRootFolder();
    this.loadFolders();
  }

  private getRootFolder(){
    this.googleDrive.getRootFolder().subscribe((data: IFileOrFolder)=>{
      this.stack.push(data);
      this.name = data.name;
    })
  }

  loadFolders() {
    this.googleDrive.getFolders(this.pageNumber, this.pageSize).subscribe(res => {
      this.data = res.result;
      this.pagination = res.pagination;
    })
  }

  onScroll() {
    if (this.pagination) {
      if (this.pageNumber < this.pagination.totalPages) {
        //get thu muc con
        if (this.fullPath) {
          this.pageNumber += 1;
          this.googleDrive.getFolders(this.pageNumber, this.pageSize, this.fullPath).subscribe(res => {
            this.data.push(...res.result);
            this.pagination = res.pagination;
          })
        } else {
          //get thu muc root khi user dang ky luu trong db
          this.pageNumber += 1;
          this.googleDrive.getFolders(this.pageNumber, this.pageSize).subscribe(res => {
            this.data.push(...res.result);
            this.pagination = res.pagination;
          })
        }
      }
    }
  }

  show() {
    this.popover.show();
  }

  hide() {
    this.popover.hide();
  }

  name = '';

  onClickOnPopover(item: IFileOrFolder) {
    this.selectedItem = item;    
    this.stack.push(item);
    this.name = item.name;
    this.fullPath = item.fullPath;
    this.pageNumber = 1;
    this.googleDrive.getFolders(this.pageNumber, this.pageSize, item.fullPath).subscribe(res => {
      this.data = res.result;
      this.pagination = res.pagination;
    })
  }

  back() {
    const item = this.stack.pop();
    if (item) {
      this.selectedItem = item;
      this.name = item.name;      
      this.fullPath = item.fullPath;
      this.pageNumber = 1;
      this.googleDrive.getFolders(this.pageNumber, this.pageSize, item.fullPath).subscribe(res => {
        this.data = res.result;
        this.pagination = res.pagination;
      })
    } else {
      alert('pop() item is undefine in stack');
    }
  }

  source: IFileOrFolder;
  set Source(val: IFileOrFolder){
    this.source = val;
  }

  moveAction(){
    if(this.selectedItem && this.source){      
      this.googleDrive.MoveFolderOrFile(this.source.isFolder,
        this.source.fullPath,
        this.selectedItem.fullPath, this.source.name).subscribe((res:any)=>{
        //delivery to home component
        this.folderOrFile.FolderOrFileMoving = res.source;
        this.hide();
      });      
    }
  }
}
