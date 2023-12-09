import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateSlot, MentorModel } from '../model/mentorModel';
import {Observable} from 'rxjs';
import { HttpResponseModel, LoginModel, LoginResponseModel, ValidateOtpModel } from '../model/commonModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  constructor(private http:HttpClient) { }
  // Register request 
  register(data:MentorModel):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.mentorURL}/register`,data);
  }

  // Resend otp request 
  resendOtp(email:object):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.mentorURL}/resendOtp`,email);
  }

  // Validating the otp
  validateOtp(data:ValidateOtpModel):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.mentorURL}/verifyOtp`,data);
  }

  //Login 
  login(data:LoginModel):Observable<LoginResponseModel>{
    console.log('Mentor login called',data);
    return this.http.post<LoginResponseModel>(`${environment.mentorURL}/login`,data);
  }

  // Forgot password
  mentorForgotPassword(email:object):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.mentorURL}/forgot-password`,email);
  }

  // change password mentor side
  changePasswordMentor(data:LoginModel):Observable<HttpResponseModel>{
    return this.http.patch<HttpResponseModel>(`${environment.mentorURL}/change-password`,data);
  }

  // mentor can create slots
  mentorCreateSlot(data:CreateSlot):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.mentorslotURL}/createSlot`,data);
  }
}
