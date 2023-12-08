import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/model/commonModel';
import { MenteeService } from 'src/app/services/mentee.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'app-mentee-new-password',
  templateUrl: './mentee-new-password.component.html',
  styleUrls: ['./mentee-new-password.component.css'],
})
export class MenteeNewPasswordComponent implements OnInit {
  newPassForm!: FormGroup;
  constructor(
    private service: MenteeService,
    private showMessage: MessageToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  changePasswordMentee(data: LoginModel) {
    this.service.changePasswordMentee(data).subscribe({
      next: (response) => {
        this.showMessage.showSuccessToastr(response.message);
      },
      error:(error)=>{
        this.showMessage.showErrorToastr(error.error.message);
      }
    });
    localStorage.removeItem('email');
    this.router.navigate(['/mentee/login']);
  }
}
