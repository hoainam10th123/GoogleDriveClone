import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IFileOrFolder } from 'src/app/models/fileOrFolder';
import { FileOrFolderService } from 'src/app/_services/file-or-folder.service';
import { GoogleDriveService } from 'src/app/_services/google-drive.service';

@Component({
  selector: 'app-rename',
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.css']
})
export class RenameComponent implements OnInit {
  renameForm: UntypedFormGroup;
  item: IFileOrFolder;

  constructor(public bsModalRef: BsModalRef, private googleDrive: GoogleDriveService, private fileOrFoler: FileOrFolderService) { }

  ngOnInit(): void {
    this.khoiTaoForm();
  }

  khoiTaoForm() {
    this.renameForm = new UntypedFormGroup({
      name: new UntypedFormControl(this.item.name, [Validators.required, Validators.maxLength(70)])      
    })
  }

  save(){
    this.googleDrive.rename(this.item, this.renameForm.value.name).subscribe(res =>{
      // phan phoi message toi Home
      this.fileOrFoler.FileOrFolderRename = res;
      this.bsModalRef.hide();
    })
  }

}
