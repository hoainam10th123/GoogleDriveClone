import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IBreadcrumb } from '../models/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class PushDataBreadcrumbService {
  private dataBreadcrumbSource = new Subject<IBreadcrumb>();
  dataBreadcrumb$ = this.dataBreadcrumbSource.asObservable();

  constructor() { }

  set DataBreadcrumb(value: IBreadcrumb) {
    this.dataBreadcrumbSource.next(value);
  }
}
