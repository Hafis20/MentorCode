import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './shared-forgot-password.component.html',
  styleUrls: ['./shared-forgot-password.component.css'],
})
export class SharedForgotPasswordComponent implements OnInit {
  
  forgotForm!:FormGroup;
  @Output() formSubmitEvent:EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private fb:FormBuilder, private showMessage:MessageToastrService) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email:['',[Validators.required,Validators.email]]
    })
  }

  onSubmit(){
    if(this.forgotForm.invalid){
      if(this.emailError()){
        this.showMessage.showWarningToastr(this.emailError());
      }
    }else{
      this.formSubmitEvent.emit(this.forgotForm);   // Passing that form as an event
    }
  }

  // Email error validation
  emailError():string{
    const email = this.forgotForm.get('email');

    if(email?.invalid){
      if(email.errors?.['required']){
        return `Email is required`
      }
      if(email.errors?.['email']){
        return `Enter a valid email`
      }
    }
    return ``
  }
}
