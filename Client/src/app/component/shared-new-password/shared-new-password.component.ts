import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidation } from 'src/app/customValidation/validation';
import { LoginModel } from 'src/app/model/commonModel';
import { CommonService } from 'src/app/services/common.service';
import { MenteeService } from 'src/app/services/mentee.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'new-password',
  templateUrl: './shared-new-password.component.html',
  styleUrls: ['./shared-new-password.component.css'],
})
export class SharedNewPasswordComponent implements OnInit {
  @Output() changePasswordEvent:EventEmitter<LoginModel> = new EventEmitter<LoginModel>();
  newPasswordForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private showMessage: MessageToastrService,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.newPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, passwordValidation]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.newPasswordForm.invalid) {
      if (this.passError()) {
        this.showMessage.showWarningToastr(this.passError());
      }
      if (this.confirmPassError()) {
        this.showMessage.showWarningToastr(this.confirmPassError());
      }
    } else {
      if (
        this.newPasswordForm.value.newPassword !==  // Checking the confirm password and both are same or not
        this.newPasswordForm.value.confirmPassword
      ) {
        this.showMessage.showWarningToastr('Password should match');
      } else {
        const data = {
          email: this.commonService.getEmailFromLocalStorage(),
          password: this.newPasswordForm.value.newPassword,
        };
        this.changePasswordEvent.emit(data);   // Passing the data for changing the password
      }
    }
  }

  passError(): string {
    const newPass = this.newPasswordForm.get('newPassword');
    if (newPass?.invalid) {
      if (newPass?.errors?.['required']) {
        return `New Password is required`;
      } else if (newPass?.errors?.['passwordPatternError']) {
        return `Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (?@$!%*).`;
      }
    }
    return ``;
  }

  confirmPassError(): string {
    const confirmPass = this.newPasswordForm.get('confirmPassword');
    if (confirmPass?.invalid) {
      if (confirmPass?.errors?.['required']) {
        return `Confirm Password is required`;
      }
    }
    return ``;
  }
}
