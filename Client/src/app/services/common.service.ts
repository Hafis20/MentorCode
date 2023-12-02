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

  getTokenFromLocalStorage():string{
    return localStorage.getItem('token') as string;
  }
}
