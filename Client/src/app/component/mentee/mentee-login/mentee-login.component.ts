import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { MenteeService } from 'src/app/services/mentee.service';
import { SharedFormService } from 'src/app/services/sharedForm.service';
import { loginMentee, loginMenteeSuccess } from 'src/app/store/Mentee/mentee.action';
import { getMenteeInfo } from 'src/app/store/Mentee/mentee.selector';

@Component({
  selector: 'mentee-login',
  templateUrl: './mentee-login.component.html',
  styleUrls: ['./mentee-login.component.css'],
})
export class MenteeLoginComponent implements OnInit {
  loginForm!: FormGroup;
  userRole:string = 'mentee';
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sharedFormGroup: SharedFormService,
    private store:Store,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      form: this.sharedFormGroup.sharedForm(),
    });

    // Calling data from state
    this.store.select(getMenteeInfo).subscribe((response)=>{
      console.log(response);
    })
  }

  // form from parent
  get formControl() {
    return this.loginForm.get('form') as FormGroup;
  }

  // When submitting the form
  submitLogin() {
    if (this.loginForm.invalid) {
      if (this.sharedFormGroup.emailError()) {
        this.toastr.warning(this.sharedFormGroup.emailError(), '', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true,
        });
      }
      if (this.sharedFormGroup.passwordError()) {
        this.toastr.warning(this.sharedFormGroup.passwordError(), '', {
          timeOut: 1000,
          progressAnimation: 'decreasing',
          progressBar: true,
        });
      }
    } else {
      // If login form is valid
      const data = {
        email: this.loginForm.value.form.email,
        password: this.loginForm.value.form.password,
      };
      
      this.store.dispatch(loginMentee({data}));
      
    }
  }
}
