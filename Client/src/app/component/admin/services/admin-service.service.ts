import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel, LoginResponseModel, MenteeInfo } from 'src/app/model/commonModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  // Login admin
  login(data:LoginModel):Observable<LoginResponseModel>{
    return this.http.post<LoginResponseModel>(`${environment.adminURL}/login`,data);
  }

  // Getting all Mentees
  getAllMentees():Observable<MenteeInfo[]>{
    return this.http.get<MenteeInfo[]>(`${environment.adminURL}/getAllMentees`);
  }
}
