import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { MessageToastrService } from '../services/message-toastr.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((res) => {
        console.log('Passing through tyhe interceptor in response');
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }
}
