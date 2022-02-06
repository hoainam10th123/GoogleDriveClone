import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                throw error.error;
              } else {
                this.toastr.error(error.error.message, error.error.statusCode);
              }
              break;
            case 401:
              this.toastr.error(error.error.message, error.error.statusCode);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              this.toastr.error(error.error.message, error.error.statusCode);
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } };
            this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('Some thing went swrong. See console.log');
              console.log(error);
              break;
          }          
        }
        return throwError(() => error);
      })
    );
  }
}
