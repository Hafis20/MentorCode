import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private service: CommonService) {}

  adminToken!:string;
  menteeToken!:string;
  mentorToken!:string;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.adminToken = this.service.getAdminTokenFromLocalStorage(); // Requiring the admin token from local storage
    this.menteeToken = this.service.getMenteeTokenFromLocalStorage();
    this.mentorToken = this.service.getMentorTokenFromLocalStorage();

    if (window.location.pathname.includes('/admin') && this.adminToken) {  //Check admin auth
      console.log('Admin Interceptor works');
      const adminToken:string = this.adminToken

      const authRequest = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Admin-Bearer ${adminToken}`,
        },
      });
      return next.handle(authRequest);
    } else if (window.location.pathname.includes('/mentee') && this.menteeToken) {   // Checking mentee auth
      // Mentee interceptor checking
      console.log('Mentee interceptor works');
      const menteeToken: string = this.menteeToken

      const authRequest = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Mentee-Bearer ${menteeToken}`,
        },
      });
      return next.handle(authRequest);
    } else if (window.location.pathname.includes('/mentor') && this.mentorToken) {  // Checking mentor auth
      // Mentor interceptor checking
      console.log('Mentor interceptor works');
      const mentorToken: string = this.mentorToken;

      const authRequest = req.clone({
        setHeaders: {
          Authorization: `Mentor-Bearer ${mentorToken}`,
        },
      });
      return next.handle(authRequest);
    } else {
      console.log('Normal interceptor works');
      return next.handle(req);
    }
  }
}
