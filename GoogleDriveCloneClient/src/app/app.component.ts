import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from './models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'GoogleDriveCloneClient';
  user: IUser;

  constructor(private accountService: AccountService, private presence: PresenceService, private router: Router){
    this.accountService.currentUser$.subscribe(user=>{
      this.user = user;
    })
  }

  ngOnInit(): void {
    this.setCurrentUser();
    if(this.user == null || undefined){
      this.router.navigateByUrl('/login');
    }
  }

  setCurrentUser(){
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }   
  }
}
