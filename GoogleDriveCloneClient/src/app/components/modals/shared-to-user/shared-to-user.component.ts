import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Select2Data, Select2SearchEvent, Select2UpdateEvent } from 'ng-select2-component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IFileOrFolder } from 'src/app/models/fileOrFolder';
import { SharedToUser } from 'src/app/models/shared-model';
import { AccountService } from 'src/app/_services/account.service';
import { FileOrFolderService } from 'src/app/_services/file-or-folder.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-shared-to-user',
  templateUrl: './shared-to-user.component.html',
  styleUrls: ['./shared-to-user.component.css']
})
export class SharedToUserComponent implements OnInit {
  cmtForm: UntypedFormGroup;
  data: Select2Data = [
    // {
    //   value: 'hoainam10th1',
    //   label: 'Nguyen Hoai Nam',
    //   data: { url: './assets/user.png', name: 'Nguyen Hoai Nam' }
    // }
  ];
  item: IFileOrFolder;
  tagUsernames: any = [];
  shortUrl = '';
  
  constructor(
    public bsModalRef: BsModalRef,
    private account: AccountService,
    private shared: SharedService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.khoiTaoForm();
    this.loadUsers('');
  }

  khoiTaoForm(){
    this.cmtForm = new UntypedFormGroup({
      content: new UntypedFormControl('', Validators.required),
      shortUrl: new UntypedFormControl('')   
    });
  }

  onSubmitData(){
    const model = new SharedToUser();

    model.fullPath = this.item.fullPath;
    model.isFolder = this.item.isFolder;
    model.name = this.item.name;
    model.sharedUsername = this.tagUsernames;

    this.shared.addShared(model).subscribe((res: any)=>{
      //console.log(res);
      this.shortUrl = res.url;
      this.toastr.success('Share link success');
    })
  }

  updateEvent(event: Select2UpdateEvent) {
    //console.log(event.value);//event.value is array string: ['ubuntu', 'hoainam10th']
    this.tagUsernames = event.value;
  }

  searchEvent(event: Select2SearchEvent){
    //console.log(event.search.length);
    if(event.search.length >= 3){
      this.loadUsers(event.search);
    }
  }

  loadUsers(search?: string){
    this.data = [];
    this.account.getUsers(search).subscribe(users=>{
      users.forEach(mem =>{
        let ob = {
          value: mem.userName,
          label: mem.displayName,
          data: { url: './assets/user.png' , name: mem.displayName, username: mem.userName }
        }
        this.data.push(ob);
      })
    })
  }

}
