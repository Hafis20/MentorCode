import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  getEmailFromLocalStorage():string{
    return localStorage.getItem('email') as string;
  }

  getRoleFromLocalStorage():string{
    return localStorage.getItem('role') as string;
  }

  getMenteeTokenFromLocalStorage():string{
    return localStorage.getItem('menteeToken') as string;
  }

  getMentorTokenFromLocalStorage():string{
    return localStorage.getItem('mentorToken') as string;
  }

  getAdminTokenFromLocalStorage():string{
    return localStorage.getItem('adminToken') as string;
  }
}
