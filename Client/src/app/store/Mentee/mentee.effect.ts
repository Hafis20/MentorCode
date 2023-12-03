import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginMentee, loginMenteeSuccess } from './mentee.action';
import { MenteeService } from 'src/app/services/mentee.service';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Injectable()
export class MenteeEffect {
  constructor(
    private action$: Actions,
    private menteeService: MenteeService,
    private showMessage: MessageToastrService,
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
              localStorage.setItem('menteeToken', userData.accessToken);
              this.showMessage.showSuccessToastr(userData.message);
              this.router.navigate(['home'])
              return loginMenteeSuccess({ mentee: userData.accessedUser });
            } else {
              return;
            }
          }),
          catchError((error) => {
            this.showMessage.showErrorToastr('Invalid Credentials');
            return of(error.message);
          })
        );
      })
    )
  );
}
