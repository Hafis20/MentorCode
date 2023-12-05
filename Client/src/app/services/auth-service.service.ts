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

  // Checking the mentor is loggedin or not
  checkMentorLoggedIn():boolean{
    const mentorLoggedIn = this.service.getMentorTokenFromLocalStorage();
    return !!mentorLoggedIn;
  }
}
