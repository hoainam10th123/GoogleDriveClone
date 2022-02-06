import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IFileOrFolder } from '../models/fileOrFolder';
import { SharedToUser } from '../models/shared-model';
import { getPaginatedResultShared, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private baseUrl = environment.apiShareUrl;
  constructor(private http: HttpClient) { }

  getShortUrl(pageNumber: number, pageSize: number, url: string){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('url', url);

    return getPaginatedResultShared<IFileOrFolder[]>(this.baseUrl+'Shared', params, this.http);
  }

  addShared(sharedToUser: SharedToUser){
    return this.http.post(this.baseUrl+'Shared', sharedToUser);
  }
}
