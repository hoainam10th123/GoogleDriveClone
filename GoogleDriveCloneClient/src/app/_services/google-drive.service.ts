import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFileOrFolder, IFileOrFolderRename } from '../models/fileOrFolder';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFileOrFolder(pageNumber: number, pageSize: number, path: string = null) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    if (path) {
      params = params.append('path', path);
    }
    return getPaginatedResult<IFileOrFolder[]>(this.baseUrl + 'GoogleDrive', params, this.http);
  }

  getFolders(pageNumber: number, pageSize: number, path: string = null) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    if (path) {
      params = params.append('path', path);
    }
    return getPaginatedResult<IFileOrFolder[]>(this.baseUrl + 'GoogleDrive/get-folders', params, this.http);
  }

  getRootFolder() {
    return this.http.get(this.baseUrl + 'GoogleDrive/get-root-folder');
  }

  deleteFileOrFolder(item: IFileOrFolder) {
    const temp = JSON.stringify(item);
    return this.http.delete(this.baseUrl + 'GoogleDrive?item=' + temp);
  }

  rename(item: IFileOrFolder, newName: string) {
    const temp = {
      path: item.path,
      fullPath: item.fullPath,
      name: item.name,
      isFolder: item.isFolder,
      newName
    }
    return this.http.put<IFileOrFolderRename>(this.baseUrl + 'GoogleDrive/rename', temp);
  }

  MoveFolderOrFile(isFolder: boolean, source: string, dest: string, name: string) {
    const model = { isFolder, source, dest: `${dest + '\\' + name}` };
    return this.http.put(this.baseUrl + 'GoogleDrive/move-file-folder', model);
  }

  createDirectory(parentPath: string, name: string) {
    return this.http.post<IFileOrFolder>(this.baseUrl + 'GoogleDrive/new-folder?parentPath=' + `${parentPath + '&name=' + name}`, {});
  }

  uploadFiles(parentPath: string, formData: FormData) {
    return this.http.post(
      this.baseUrl + 'GoogleDrive/Upload?parentPath=' + parentPath,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        map(res=>{
          return res;
        })
      );
  }
}
