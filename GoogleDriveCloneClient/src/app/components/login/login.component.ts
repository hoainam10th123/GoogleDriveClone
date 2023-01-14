import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  errors: string[];

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {    
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new UntypedFormGroup({
      userName: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)])
    });
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (e) => {
        console.error(e)
        this.errors = e.errors;
      }
    });
  }

}
