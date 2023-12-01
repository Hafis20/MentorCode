import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginMentee, loginMenteeSuccess } from './mentee.action';
import { MenteeService } from 'src/app/services/mentee.service';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class MenteeEffect {
  constructor(
    private action$: Actions,
    private menteeService: MenteeService,
    private toastr: ToastrService,
    private router:Router
  ) {}

  _loginMentee = createEffect(() =>
    this.action$.pipe(
      ofType(loginMentee),
      exhaustMap((action) => {
        return this.menteeService.login(action.data).pipe(
          map((data) => {
            const userData = data;
            if (userData) {
              localStorage.setItem('token', userData.accessToken);
              this.toastr.success(userData.message, '', {
                timeOut: 2000,
                progressAnimation: 'increasing',
                progressBar: true,
              });
              this.router.navigate(['home']);
              return loginMenteeSuccess({ mentee: userData.accessedMentee });
            } else {
              return;
            }
          }),
          catchError((error) => {
            this.toastr.error('Invalid credentials', '', {
              timeOut: 2000,
              progressAnimation: 'increasing',
              progressBar: true,
            });
            return of(error.message);
          })
        );
      })
    )
  );
}
