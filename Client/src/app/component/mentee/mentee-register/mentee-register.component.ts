import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenteeService } from 'src/app/services/mentee.service';
import { SharedFormService } from 'src/app/services/sharedForm.service';

@Component({
  selector: 'app-mentee-register',
  templateUrl: './mentee-register.component.html',
  styleUrls: ['./mentee-register.component.css'],
})
export class MenteeRegisterComponent implements OnInit {
  namePattern = '[a-zA-Z][a-zA-Z ]+';
  mobilePattern = /^[0-9]{10}$/;
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sharedForm: SharedFormService,
    private service:MenteeService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
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
        this.toastr.warning(this.nameError(), '', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true,
        });
      }
      // Handling mobile number error
      if (this.mobileError()) {
        this.toastr.warning(this.mobileError(), '', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true,
        });
      }
      // Handling email error
      if (this.sharedForm.emailError()) {
        this.toastr.warning(this.sharedForm.emailError(), '', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true,
        });
      }
      // Handling password error
      if (this.sharedForm.passwordError()) {
        this.toastr.warning(this.sharedForm.passwordError(), '', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true,
        });
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
          this.toastr.success(response.message, '', {
            timeOut: 3000,
            progressAnimation: 'increasing',
            progressBar: true,
          });
          this.registerForm.reset()
          localStorage.setItem('email',menteeData.email); 
          localStorage.setItem('role','mentee'); 
          this.router.navigate(['verify-otp']);
        },
        error:(error)=>{
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
            progressAnimation: 'increasing',
            progressBar: true,
          });
          setTimeout(()=>{
            // window.location.reload();
          },3000)
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
