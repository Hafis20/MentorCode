import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from './../../environments/environment';
import { HttpResponseModel,LoginModel,LoginResponseModel, ValidateOtpModel } from '../model/commonModel';

import { Observable } from 'rxjs';
import { MenteeModel } from '../model/menteeModel';

@Injectable({
  providedIn: 'root'
})
export class MenteeService {

  constructor(private http:HttpClient) { }

  // Registering a mentee
  registerMentee(data:MenteeModel):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.menteeURL}/register`,data);
  }

  // Resend otp
  resendOtp(email:object):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.menteeURL}/resendOtp`,email);
  }

  // Validating the otp
  validateOtp(data:ValidateOtpModel):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.menteeURL}/verifyOtp`,data);
  }

  // Login User
  login(data:LoginModel):Observable<LoginResponseModel>{
    return this.http.post<LoginResponseModel>(`${environment.menteeURL}/login`,data);
  }
}
