import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenteeService } from 'src/app/services/mentee.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'mentee-forgot-password',
  templateUrl: './mentee-forgot-password.component.html',
  styleUrls: ['./mentee-forgot-password.component.css']
})
export class MenteeForgotPasswordComponent implements OnInit{
      constructor(private service: MenteeService, private showMessage:MessageToastrService,private router:Router){}

      ngOnInit(): void {
        
      }

      forgotForm(form:FormGroup){
        const email = form.value.email;
        this.service.menteeForgotPassword({email}).subscribe({
          next:(response)=>{
            localStorage.setItem('email',email);
            localStorage.setItem('role','menteeForgot');
            this.router.navigate(['/mentee/verify-otp']);
            this.showMessage.showSuccessToastr(response.message);
          },
          error:(error)=>{
            this.showMessage.showErrorToastr(error.error.message);
          }
        })
      } 
}
