import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MenteeService } from 'src/app/services/mentee.service';
import { MentorService } from 'src/app/services/mentor.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  counter: number = 30;
  timerInterval: any;
  otpPattern = /^[0-9]+$/;
  email = this.commonservice.getEmailFromLocalStorage();
  role = this.commonservice.getRoleFromLocalStorage();
  constructor(
    private commonservice: CommonService,
    private menteeService: MenteeService,
    private mentorService: MentorService,
    private fb: FormBuilder,
    private showMessage: MessageToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.counterFtn();
  }

  otpForm = this.fb.group({
    otp: ['', [Validators.required, Validators.pattern(this.otpPattern)]],
  });

  // Refreshing the counter
  counterFtn() {
    this.timerInterval = setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  // Resend otp button clicked action
  resendClicked() {
    this.counter = 30;
    clearInterval(this.timerInterval);
    this.counterFtn();
    if (this.role === 'mentee' || this.role === 'menteeForgot') {
      this.menteeService.resendOtp({ email: this.email }).subscribe({
        next: (response) => {
          this.showMessage.showSuccessToastr(response.message);
          this.otpForm.reset();
        },
      });
    } else if (this.role === 'mentor') {
      this.mentorService.resendOtp({ email: this.email }).subscribe({
        next: (response) => {
          this.showMessage.showSuccessToastr(response.message);
          this.otpForm.reset();
        },
      });
    } else {
      return;
    }
  }

  // Submitting the otp form
  onSubmit() {
    if (this.otpForm.invalid) {
      // If the form is not valid go to the following actions
      if (this.otpError()) {
        this.showMessage.showWarningToastr(this.otpError());
      }
    } else {
      // If the form is valid then go to the following actions
      if (this.role === 'mentee' || this.role === 'menteeForgot') {
        // We are checking which purpose they are comming to the otp page
        const data = {
          email: this.email,
          otp: this.otpForm.value.otp as string,
        };

        this.menteeService.validateOtp(data).subscribe({
          next: (response) => {
            if (this.role === 'mentee') {
              // Its is normal account verification
              this.showMessage.showSuccessToastr(response.message);
              this.router.navigate(['/mentee/login']);
              localStorage.removeItem('email'); // In this case we just clear the mail
            } else {
              // It is for forgot password purpose
              this.showMessage.showSuccessToastr('Create your new password');
              this.router.navigate(['/mentee/new-password']);
            }
            localStorage.removeItem('role');
          },
          error: (error) => {
            this.showMessage.showErrorToastr(error.error.message);
          },
        });
      } else if (this.role === 'mentor' || this.role === 'mentorForgot') {
        const data = {
          email: this.email,
          otp: this.otpForm.value.otp as string,
        };

        this.mentorService.validateOtp(data).subscribe({
          next: (response) => {
            if (this.role === 'mentor') {
              this.showMessage.showSuccessToastr(response.message);
              this.router.navigate(['/mentor/login']);
              localStorage.removeItem('email');
            }else{
              this.showMessage.showSuccessToastr('Create your new password');
              this.router.navigate(['/mentor/new-password']);
            }
            localStorage.removeItem('role');
          },
          error: (error) => {
            this.showMessage.showErrorToastr(error.error.message);
          },
        });
      }
    }
  }

  // OTP error handling
  otpError(): string {
    const otp = this.otpForm.get('otp');
    if (otp?.errors?.['required']) {
      return `OTP is required`;
    } else if (otp?.errors?.['pattern']) {
      return `Enter a valid OTP`;
    }
    return ``;
  }
}
