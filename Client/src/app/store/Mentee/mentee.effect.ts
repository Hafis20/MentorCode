import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getMentee, getMenteeSuccess, loginMentee, loginMenteeSuccess } from './mentee.action';
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
            console.log(data);
            const userData = data;
            if (userData) {
              localStorage.setItem('menteeToken', userData.accessToken);
              this.showMessage.showSuccessToastr(userData.message);
              this.router.navigate(['/mentee/list-mentors']);
              return loginMenteeSuccess({ mentee: userData.accessedUser });
            } else {
              return;
            }
          }),
          catchError((error) => {
            this.showMessage.showErrorToastr(error.error.message);
            return of(error.message);
          })
        );
      })
    )
  );

  _getMentee$ = createEffect(()=>
      this.action$.pipe(
        ofType(getMentee),
        exhaustMap((action)=>{
          return this.menteeService.getMentee().pipe(
            map((data)=>{
              console.log(data);
              return getMenteeSuccess({mentee:data});
            }),
            catchError((err)=>{
              this.showMessage.showErrorToastr(err.error.message);
              return of(err.message);
            })
          )
        })
      )
  )
}
