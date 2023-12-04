import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenteeData, MentorData } from 'src/app/model/adminModel';
import { LoginModel, LoginResponseModel, UserInfo } from 'src/app/model/commonModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  // Checking the admin is loggedin or not
  checkAdminLoggedIn():boolean{
    const adminLoggedIn = window.localStorage.getItem('adminToken');
    return !!adminLoggedIn;
  }

  // Login admin
  login(data:LoginModel):Observable<LoginResponseModel>{
    return this.http.post<LoginResponseModel>(`${environment.adminURL}/login`,data);
  }

  // Getting all Mentees
  getAllMentees():Observable<MenteeData[]>{
    return this.http.get<MenteeData[]>(`${environment.adminURL}/getAllMentees`);
  }

  // Getting all Mentors
  getAllMentors():Observable<MentorData[]>{
    return this.http.get<MentorData[]>(`${environment.adminURL}/getAllMentors`);
  }
}
