import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  nameValidation,
  negativeValidation,
} from 'src/app/customValidation/validation';
import { MentorService } from 'src/app/services/mentor.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { SharedFormService } from 'src/app/services/sharedForm.service';

@Component({
  selector: 'mentor-register',
  templateUrl: './mentor-register.component.html',
  styleUrls: ['./mentor-register.component.css'],
})
export class MentorRegisterComponent implements OnInit {
  mobilePattern = /^[0-9]{10}$/;
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private sharedForm: SharedFormService,
    private showMessage: MessageToastrService,
    private mentorService:MentorService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, nameValidation]],
      form: this.sharedForm.sharedForm(),
      mobile: [
        '',
        [Validators.required, Validators.pattern(this.mobilePattern)],
      ],
      experience: ['', [Validators.required, negativeValidation]],
    });
  }

  // Onsubmitting the form
  onSubmit() {
    // If the form is invalid the following code will be run
    if (this.registerForm.invalid) {
      // Handling the name error
      if(this.nameError()){
        this.showMessage.showWarningToastr(this.nameError());
      }
      // Handling the email error
      if(this.sharedForm.emailError()){
        this.showMessage.showWarningToastr(this.sharedForm.emailError());
      }
      // Handling the password error 
      if(this.sharedForm.passwordError()){
        this.showMessage.showWarningToastr(this.sharedForm.passwordError());
      }
      // Handling the mobile error
      if(this.mobileError()){
        this.showMessage.showWarningToastr(this.mobileError());
      }
      // Handling the experience error 
      if(this.experienceError()){
        this.showMessage.showWarningToastr(this.experienceError());
      }
    }else{
      // Proceeding the form for registration
      const registerForm = this.registerForm.value;
      const data = {
        name:registerForm.name,
        email:registerForm.form.email,
        password:registerForm.form.password,
        mobile:registerForm.mobile,
        experience:registerForm.experience,
      }
      this.mentorService.register(data).subscribe({ // Getting the observable
        next:(response)=>{
          this.showMessage.showSuccessToastr(response.message);
          localStorage.setItem('email',data.email);  // Storing email for resend option
          localStorage.setItem('role','mentor');    // Storing role for navigation
          this.router.navigate(['/mentor/verify-otp']);
        },
        error:(error)=>{
          this.showMessage.showErrorToastr(error.error.message);
        }
      })
    }
  }

  get formControl() {
    return this.registerForm.get('form') as FormGroup;
  }

  // Name error handling
  nameError(): string {
    const name = this.registerForm.get('name');

    if (name?.invalid) {
      if (name.errors?.['required']) {
        return `Name is required`;
      } else if (name.errors?.['nameError']) {
        return `Enter a valid name`;
      } else if (name.errors?.['minlength']) {
        return `Name should contain minimum 3 letters`;
      } else if (name.errors?.['pattern']) {
        return `Name is invalid`;
      }
    }
    return ``;
  }

  // mobile error handling
  mobileError(): string {
    const mobile = this.registerForm.get('mobile');
    if (mobile?.invalid) {
      if (mobile?.errors?.['required']) {
        return `Mobile Number is required`;
      } else if (mobile?.errors?.['pattern']) {
        return `Mobile Number is invalid`;
      }
    }
    return ``;
  }

  // Experience error handling

  experienceError(): string {
    const experience = this.registerForm.get('experience');
    if (experience?.invalid) {
      if (experience.errors?.['required']) {
        return `Experience is required`;
      } else if (experience.errors?.['negativeError']) {
        return `Experience should be atleast one year`;
      }
    }
    return ``;
  }
}
