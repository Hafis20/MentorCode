import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpResponseModel,LoginModel,LoginResponseModel, UserInfo, ValidateOtpModel } from '../model/commonModel';

import { Observable } from 'rxjs';
import { ListMentorsHomeOfMentee, MenteeModel, MenteeProfile, ShowMenteeCalenderData } from '../model/menteeModel';
import { GetMentorSlots } from '../model/mentorModel';
import { FeedbackBtn } from '../model/bookingsModel';

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
  getMentor(id:string):Observable<ListMentorsHomeOfMentee[]>{
    return this.http.get<ListMentorsHomeOfMentee[]>(`${environment.menteeURL}/getMentor/?id=${id}`);
  }

  // Get mentee for storing in the store
  getMentee():Observable<UserInfo>{
    return this.http.get<UserInfo>(`${environment.menteeURL}/getMentee`);
  }

  // get profile
  getMenteeProfile():Observable<MenteeProfile>{
    return this.http.get<MenteeProfile>(`${environment.menteeURL}/getProfile`);
  }

  // Edit mentee profile
  editMenteeProfile(data:any):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.menteeURL}/editProfile`,data);
  }

  // Take the mentor slots to view page
  getMentorSlots(id:string):Observable<GetMentorSlots>{
    return this.http.get<GetMentorSlots>(`${environment.menteeURL}/getMentorSlots/?id=${id}`);
  }

  // For showing the send feedback button we check once the mentor took a session for this particular mentee
  menteeOnceCompletedSession(data:{mentorId:string,menteeId:string}):Observable<FeedbackBtn>{
    return this.http.post<FeedbackBtn>(`${environment.menteeURL}/onceCompleted`,data);
  }

  // Feedback for mentor in mentee side
  sendFeedback(data:any):Observable<HttpResponseModel>{
    console.log(data);
    return this.http.post<HttpResponseModel>(`${environment.menteeURL}/setFeedback`,data);
  }
}
