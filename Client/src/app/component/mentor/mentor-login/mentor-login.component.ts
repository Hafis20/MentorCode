import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { SharedFormService } from 'src/app/services/sharedForm.service';
import { loginMentor } from 'src/app/store/Mentor/mentor.action';

@Component({
  selector: 'app-mentor-login',
  templateUrl: './mentor-login.component.html',
  styleUrls: ['./mentor-login.component.css'],
})
export class MentorLoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private sharedForm: SharedFormService,
    private showMessage:MessageToastrService,
    private store:Store,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      form: this.sharedForm.sharedForm(),
    });
  }
  get formControl() {
    return this.loginForm.get('form') as FormGroup;
  }

  onSubmit() {
    if(this.loginForm.invalid){
      // Handling email error
      if(this.sharedForm.emailError()){
        this.showMessage.showWarningToastr(this.sharedForm.emailError());
      }

      if(this.sharedForm.passwordError()){
        this.showMessage.showWarningToastr(this.sharedForm.passwordError());
      }
    }else{
      const loginForm = this.loginForm.value.form;
      const data = {
        email:loginForm.email,
        password:loginForm.password
      }
      this.store.dispatch(loginMentor({data}));
    }
  }
}
