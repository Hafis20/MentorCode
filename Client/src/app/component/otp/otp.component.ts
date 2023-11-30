import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { MenteeService } from 'src/app/services/mentee.service';

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
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router:Router,
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
    if (this.role === 'mentee') {
      this.menteeService.resendOtp({email:this.email}).subscribe({
        next: (response) => {
          console.log(response);
        },
      });
    } else if (this.role === 'mentor') {
    } else {
    }
  }

  // Submitting the otp form
  onSubmit() { 
    if (this.otpForm.invalid) { // If the form is not valid go to the following actions
      if (this.otpError()) {
        this.toastr.warning(this.otpError(), '', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true,
        });
      }
    } else { // If the form is valid then go to the following actions
      if (this.role === 'mentee') {
        const data = {
          email: this.email,
          otp: this.otpForm.value.otp as string,
        };

        this.menteeService.validateOtp(data).subscribe({
          next: (response) => {
            this.toastr.success(response.message,'',{
              timeOut:2000,
              progressAnimation:'increasing',
              progressBar:true
            }),
            this.router.navigate(['mentee-login']);
          },
          error:(error)=>{
            this.toastr.error(error.error.message,'',{
              timeOut:2000,
              progressAnimation:'increasing',
              progressBar:true
            })
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
