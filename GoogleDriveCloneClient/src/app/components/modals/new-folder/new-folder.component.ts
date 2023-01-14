import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IFileOrFolder } from 'src/app/models/fileOrFolder';
import { FileOrFolderService } from 'src/app/_services/file-or-folder.service';
import { GoogleDriveService } from 'src/app/_services/google-drive.service';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.css']
})
export class NewFolderComponent implements OnInit {
  renameForm: UntypedFormGroup;
  parentPath: string;
  
  constructor(public bsModalRef: BsModalRef, private googleDrive: GoogleDriveService, private fileOrFoler: FileOrFolderService) { }

  ngOnInit(): void {
    this.khoiTaoForm();
  }

  khoiTaoForm() {
    this.renameForm = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required, Validators.maxLength(70)])      
    })
  }

  save(){
    this.googleDrive.createDirectory(this.parentPath, this.renameForm.value.name).subscribe(res=>{
      this.fileOrFoler.NewFolder = res;// to home component
      this.bsModalRef.hide();
    })
  }
}
