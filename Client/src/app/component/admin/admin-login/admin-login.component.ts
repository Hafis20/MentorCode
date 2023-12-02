import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { SharedFormService } from 'src/app/services/sharedForm.service';
import { loginAdmin } from 'src/app/store/Admin/admin.action';
import { getAdminInfo } from 'src/app/store/Admin/admin.selector';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  userRole: string = 'admin';
  constructor(
    private fb: FormBuilder,
    private sharedForm: SharedFormService,
    private toastr: ToastrService,
    private store:Store,
  ) {}

  ngOnInit(): void {}

  loginForm = this.fb.group({
    form: this.sharedForm.sharedForm(),
  });

  onSubmit() { 
    if (this.loginForm.invalid) { // Form contails error
      // Handling email error
      if(this.sharedForm.emailError()){
        this.toastr.warning(this.sharedForm.emailError(),'',{
          timeOut:2000,
          progressAnimation:'increasing',
          progressBar:true,
        })
      }
      // Handling password error
      if(this.sharedForm.passwordError()){
        this.toastr.warning(this.sharedForm.passwordError(),'',{
          timeOut:2000,
          progressAnimation:'increasing',
          progressBar:true,
        })
      }
    }else{
      // If form is valid 
      const data = {
        email:this.loginForm.value.form.email,
        password:this.loginForm.value.form.password,
      }
      this.store.dispatch(loginAdmin({data}));
    }
  }
}
