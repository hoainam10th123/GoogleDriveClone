import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Select2Module } from 'ng-select2-component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {ClipboardModule} from '@angular/cdk/clipboard';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NavComponent } from './components/nav/nav.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { MyBreadcrumbComponent } from './components/my-breadcrumb/my-breadcrumb.component';
import { ConfirmDialogComponent } from './components/modals/confirm-dialog/confirm-dialog.component';
import { RenameComponent } from './components/modals/rename/rename.component';
import { NewFolderComponent } from './components/modals/new-folder/new-folder.component';
import { MovetoComponent } from './components/moveto/moveto.component';
import { SharedToUserComponent } from './components/modals/shared-to-user/shared-to-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    ServerErrorComponent,
    NavComponent,
    TextInputComponent,
    MyBreadcrumbComponent,
    ConfirmDialogComponent,
    RenameComponent,
    NewFolderComponent,
    MovetoComponent,
    SharedToUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    NgxSpinnerModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ClipboardModule,
    InfiniteScrollModule,    
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true
    }),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
