import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, LoginResponseModel } from '../model/commonModel';
import { Observable } from 'rxjs';
import { adminURL } from '../serverUrl';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  // Login admin
  login(data:LoginModel):Observable<LoginResponseModel>{
    return this.http.post<LoginResponseModel>(`${adminURL}/login`,data);
  }

  // Getting all Mentees
  getAllMentees(){

  }
}
