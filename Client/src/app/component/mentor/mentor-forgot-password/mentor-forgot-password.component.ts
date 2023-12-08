import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MentorService } from 'src/app/services/mentor.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'app-mentor-forgot-password',
  templateUrl: './mentor-forgot-password.component.html',
  styleUrls: ['./mentor-forgot-password.component.css'],
})
export class MentorForgotPasswordComponent implements OnInit {
  constructor(private service:MentorService,private showMessage:MessageToastrService,private router:Router) {}

  ngOnInit(): void {}

  forgotForm(form:FormGroup){
    const email = form.value.email;
        this.service.mentorForgotPassword({email}).subscribe({
          next:(response)=>{
            localStorage.setItem('email',email);
            localStorage.setItem('role','mentorForgot');
            this.router.navigate(['/mentor/verify-otp']);
            this.showMessage.showSuccessToastr(response.message);
          },
          error:(error)=>{
            this.showMessage.showErrorToastr(error.error.message);
          }
        })
  }
}
