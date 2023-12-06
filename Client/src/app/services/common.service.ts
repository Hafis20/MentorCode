import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }
  // get the email from local storage for the resend otp action
  getEmailFromLocalStorage():string{
    return localStorage.getItem('email') as string;
  }
  // get the role from local storage when we are using the same otp page to identify which user is currently on that page
  getRoleFromLocalStorage():string{
    return localStorage.getItem('role') as string;
  }
  // get the mentee token from local storage
  getMenteeTokenFromLocalStorage():string{
    return localStorage.getItem('menteeToken') as string;
  }
  // get the mentor token from local storage
  getMentorTokenFromLocalStorage():string{
    return localStorage.getItem('mentorToken') as string;
  }
  // get the admin token from local storage
  getAdminTokenFromLocalStorage():string{
    return localStorage.getItem('adminToken') as string;
  }

}
