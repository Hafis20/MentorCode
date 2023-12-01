import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { menteeURL } from '../serverUrl';
import { HttpResponseModel,LoginModel,LoginResponseModel,MenteeModel, ValidateOtpModel } from '../model/menteeModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenteeService {

  constructor(private http:HttpClient) { }

  // Registering a mentee
  registerMentee(data:MenteeModel):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${menteeURL}/register`,data);
  }

  // Resend otp
  resendOtp(email:object):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${menteeURL}/resendOtp`,email);
  }

  // Validating the otp
  validateOtp(data:ValidateOtpModel):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${menteeURL}/verifyOtp`,data);
  }

  // Login User
  login(data:LoginModel):Observable<LoginResponseModel>{
    return this.http.post<LoginResponseModel>(`${menteeURL}/login`,data);
  }
}
