import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private service:CommonService) {}

  // Checking the mentee is loggedin or not
  checkMenteeLoggedIn():boolean{
    const menteeLoggedIn = this.service.getMenteeTokenFromLocalStorage();
    return !!menteeLoggedIn;
  }

  checkAdminLoggedIn():boolean{
    const adminLoggedIn = this.service.getAdminTokenFromLocalStorage();
    return !!adminLoggedIn;
  }
}
