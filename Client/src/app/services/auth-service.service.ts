import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor() {}

  // Checking the mentee is loggedin or not
  checkMenteeLoggedIn():boolean{
    const menteeLoggedIn = window.localStorage.getItem('menteeToken');
    return !!menteeLoggedIn;
  }

  // Checking the admin is loggedin or not
  checkAdminLoggedIn():boolean{
    const adminLoggedIn = window.localStorage.getItem('adminToken');
    return !!adminLoggedIn;
  }
}
