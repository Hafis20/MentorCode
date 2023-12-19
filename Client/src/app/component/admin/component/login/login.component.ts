import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { loginAdmin } from '../../store/admin.action';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  passwordPattern: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private store: Store,
    private showMessage: MessageToastrService
  ) {}

  ngOnInit(): void {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(this.passwordPattern)],
    ],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      // Handling email error
      if (this.emailError()) {
        this.showMessage.showWarningToastr(this.emailError());
      }
      // Handling password error
      if (this.passwordError()) {
        this.showMessage.showWarningToastr(this.passwordError());
      }
    } else {
      const data ={
        email:this.loginForm.value.email as string,
        password:this.loginForm.value.password as string,
      }
      this.store.dispatch(loginAdmin({data}));
    }
  }

  // Error handling function for email
  emailError(): string {
    const email = this.loginForm.get('email');

    if (email?.invalid) {
      if (email.errors?.['required']) {
        return `Email is required`;
      }
      if (email.errors?.['email']) {
        return `Enter a valid email`;
      }
    }
    return ``;
  }

   // Error handling function for password
  passwordError(): string {
    const password = this.loginForm.get('password');

    if (password?.invalid) {
      if (password.errors?.['required']) {
        return `Password is required`;
      } else if (password?.errors?.['pattern']) {
        return `Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (?@$!%*).`;
      }
    }
    return ``;
  }
}
