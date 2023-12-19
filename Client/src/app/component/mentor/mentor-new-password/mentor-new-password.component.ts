import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/model/commonModel';
import { MentorService } from 'src/app/services/mentor.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'app-mentor-new-password',
  templateUrl: './mentor-new-password.component.html',
  styleUrls: ['./mentor-new-password.component.css']
})
export class MentorNewPasswordComponent {
  constructor(private service:MentorService,private showMessage:MessageToastrService,private router:Router){}

  changePasswordMentor(data: LoginModel) {
    this.service.changePasswordMentor(data).subscribe({
      next: (response) => {
        this.showMessage.showSuccessToastr(response.message);
      },
      error:(error)=>{
        this.showMessage.showErrorToastr(error.error.message);
      }
    });
    localStorage.removeItem('email');
    this.router.navigate(['/mentor/login']);
  }
}
