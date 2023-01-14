import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, of, switchMap, timer } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: UntypedFormGroup;
  errors: string[];

  constructor(private fb: UntypedFormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required, Validators.maxLength(50)]],
      username: [null,
        [Validators.required],
        [this.validateEmailNotTaken()]
      ],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]]
    });
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: (res) => this.router.navigateByUrl('/'),
      error: (e) => {
        console.error(e)
        this.errors = e.errors;
      },
      complete: () => console.info('complete')
    });
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkUsernameExists(control.value).pipe(
            map(res => {
              return res ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }
}
