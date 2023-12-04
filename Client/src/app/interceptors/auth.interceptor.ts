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
  constructor(private service:CommonService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(window.location.pathname.includes('/mentee')){
      console.log('Mentee interceptor works')
      const menteeToken:string = this.service.getMenteeTokenFromLocalStorage();

      const authRequest = req.clone({
        setHeaders:{
          'Content-Type':'application/json',
          Authorization : `Mentee-Bearer ${menteeToken}`
        }
      })
      return next.handle(authRequest);
    }else{
      console.log('Mentor interceptor works')
      const mentorToken:string = this.service.getMentorTokenFromLocalStorage();

      const authRequest = req.clone({
        setHeaders:{
          'Content-Type':'application/json',
          Authorization :`Mentor-Bearer ${mentorToken}`
        }
      })
      return next.handle(authRequest);
    }
  }
}
