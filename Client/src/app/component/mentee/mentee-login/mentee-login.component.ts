import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { MenteeService } from 'src/app/services/mentee.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { SharedFormService } from 'src/app/services/sharedForm.service';
import { loginMentee, loginMenteeSuccess } from 'src/app/store/Mentee/mentee.action';
import { getMenteeInfo } from 'src/app/store/Mentee/mentee.selector';

@Component({
  selector: 'mentee-login',
  templateUrl: './mentee-login.component.html',
  styleUrls: ['./mentee-login.component.css'],
})
export class MenteeLoginComponent implements OnInit {
  loginForm!: FormGroup;
  userRole:string = 'mentee';
  constructor(
    private fb: FormBuilder,
    private showMessage: MessageToastrService,
    private sharedFormGroup: SharedFormService,
    private store:Store,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      form: this.sharedFormGroup.sharedForm(),
    });
  }

  // form from parent
  get formControl() {
    return this.loginForm.get('form') as FormGroup;
  }

  // When submitting the form
  submitLogin() {
    if (this.loginForm.invalid) {
      // Handling email error
      if (this.sharedFormGroup.emailError()) {
        this.showMessage.showWarningToastr(this.sharedFormGroup.emailError());
      }
      //Handling password error
      if (this.sharedFormGroup.passwordError()) {
        this.showMessage.showWarningToastr(this.sharedFormGroup.passwordError());
      }
    } else {
      // If login form is valid
      const data = {
        email: this.loginForm.value.form.email,
        password: this.loginForm.value.form.password,
      };
      
      this.store.dispatch(loginMentee({data}));
      
    }
  }
}
