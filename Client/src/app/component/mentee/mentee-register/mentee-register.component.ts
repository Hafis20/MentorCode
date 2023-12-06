import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { nameValidation } from 'src/app/customValidation/validation';
import { MenteeService } from 'src/app/services/mentee.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { SharedFormService } from 'src/app/services/sharedForm.service';

@Component({
  selector: 'app-mentee-register',
  templateUrl: './mentee-register.component.html',
  styleUrls: ['./mentee-register.component.css'],
})
export class MenteeRegisterComponent implements OnInit {
  mobilePattern = /^[0-9]{10}$/;
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private showMessage: MessageToastrService,
    private sharedForm: SharedFormService,
    private service:MenteeService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3),nameValidation]],
      mobile: [
        '',
        [Validators.required, Validators.pattern(this.mobilePattern)],
      ],
      form: this.sharedForm.sharedForm(),
    });
  }

  get formControl() {
    return this.registerForm.get('form') as FormGroup;
  }

  // Register Form Configuration

  // On submitting the button
  onSubmit() {
    if (this.registerForm.invalid) {
      // Handling name error
      if (this.nameError()) {
        this.showMessage.showWarningToastr(this.nameError());
      }
      // Handling mobile number error
      if (this.mobileError()) {
        this.showMessage.showWarningToastr(this.mobileError());
      }
      // Handling email error
      if (this.sharedForm.emailError()) {
        this.showMessage.showWarningToastr(this.sharedForm.emailError());
      }
      // Handling password error
      if (this.sharedForm.passwordError()) {
        this.showMessage.showWarningToastr(this.sharedForm.passwordError());
      }
    } else {
      //----- Backend call------------------------
      const menteeData = {
        name: this.registerForm.value.name,
        mobile: this.registerForm.value.mobile,
        email: this.registerForm.value.form.email,
        password: this.registerForm.value.form.password,
      };

      this.service.registerMentee(menteeData).subscribe({
        next:(response)=>{
        this.showMessage.showSuccessToastr(response.message);
          localStorage.setItem('email',menteeData.email); 
          localStorage.setItem('role','mentee'); 
          this.router.navigate(['/mentee/verify-otp']);
        },
        error:(error)=>{
          this.showMessage.showErrorToastr(error.error.message);
        }
      })
    }
  }

  // name error handling
  nameError(): string {
    const name = this.registerForm.get('name');

    if (name?.invalid) {
      if (name.errors?.['required']) {
        return `Name is required`;
      }else if(name.errors?.['nameError']){
        return `Enter a valid name`
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
}
