import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent, 
    canActivate:[AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},  
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
