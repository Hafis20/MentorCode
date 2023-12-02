import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  adminToken!: string;
  mentorToken!: string;
  menteeToken!: string;

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.adminToken = window.localStorage.getItem('adminToken') as string;
    this.menteeToken = window.localStorage.getItem('menteeToken') as string;

    if (window.location.pathname.includes('/admin') && this.adminToken) {
      const authToken = this.adminToken;
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return next.handle(authRequest);
    } else if (
      window.location.pathname.includes('/mentor') &&
      this.mentorToken
    ) {
      const authToken = this.menteeToken;
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return next.handle(authRequest);
    } else {
      const authToken = this.menteeToken;
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return next.handle(authRequest);
    }
  }
}
