import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpResponseModel,LoginModel,LoginResponseModel, ValidateOtpModel } from '../model/commonModel';

import { Observable } from 'rxjs';
import { ListMentorsHomeOfMentee, MenteeModel, ShowMenteeCalenderData } from '../model/menteeModel';

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
  
  //get all mentors for the mentee details page
  getAvaliableMentors():Observable<ListMentorsHomeOfMentee[]>{
    return this.http.get<ListMentorsHomeOfMentee[]>(`${environment.menteeURL}/getAvailableMentors`);
  }

  // Forgot password call
  menteeForgotPassword(email:object):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.menteeURL}/forgot-password`,email);
  }

  // Forgot password new password call
  changePasswordMentee(data:LoginModel):Observable<HttpResponseModel>{
    return this.http.patch<HttpResponseModel>(`${environment.menteeURL}/change-password`,data);
  }

  // When the mentee clicks on the mentor details 
  getMentor(id:string):Observable<ListMentorsHomeOfMentee>{
    return this.http.get<ListMentorsHomeOfMentee>(`${environment.menteeURL}/getMentor/?id=${id}`);
  }

  // Take the mentor slots to view page
  getMentorSlots(id:string):Observable<ShowMenteeCalenderData[]>{
    return this.http.get<ShowMenteeCalenderData[]>(`${environment.menteeURL}/getMentorSlots/?id=${id}`);
  }
}
