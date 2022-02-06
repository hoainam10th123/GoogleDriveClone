import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IFileOrFolder, IFileOrFolderRename } from '../models/fileOrFolder';

@Injectable({
  providedIn: 'root'
})
export class FileOrFolderService {
  private fileOrFolderRenameSource = new Subject<IFileOrFolderRename>();
  fileOrFolderRename$ = this.fileOrFolderRenameSource.asObservable();

  private newFolderSource = new Subject<IFileOrFolder>();
  newFolder$ = this.newFolderSource.asObservable();

  private folderOrFileMovingSource = new Subject<string>();
  folderOrFileMoving$ = this.folderOrFileMovingSource.asObservable();

  constructor() { }

  set FileOrFolderRename(value: IFileOrFolderRename) {
    this.fileOrFolderRenameSource.next(value);
  }

  set NewFolder(value: IFileOrFolder) {
    this.newFolderSource.next(value);
  }

  set FolderOrFileMoving(value: string) {
    this.folderOrFileMovingSource.next(value);
  }
}
