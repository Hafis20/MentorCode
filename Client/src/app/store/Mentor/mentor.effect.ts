import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getMentor, getMentorSuccess, loginMentor, loginMentorSuccess } from './mentor.action';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { MentorService } from 'src/app/services/mentor.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { Router } from '@angular/router';

@Injectable()
export class MentorEffect {
  constructor(
    private action$: Actions,
    private mentorService: MentorService,
    private showMessage: MessageToastrService,
    private router:Router,
  ) {}

  _login$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginMentor),
      exhaustMap((action) => {
        return this.mentorService.login(action.data).pipe(
          map((data) => {
            const mentorData = data;
            localStorage.setItem('mentorToken', mentorData.accessToken); // Setting the jwt token inside the  local storage
            this.showMessage.showSuccessToastr(mentorData.message);
            this.router.navigate(['/mentor/dashboard']);
            return loginMentorSuccess({ mentor: mentorData.accessedUser });
          }),
          catchError((error) => {
            this.showMessage.showErrorToastr(error.error.message);
            return of(error.error.message);
          })
        );
      })
    )
  );


  // Get mentor data while reloading
  _getMentor$ = createEffect(()=>
      this.action$.pipe(
        ofType(getMentor),
        exhaustMap((action)=>{
          return this.mentorService.getMentorDetails().pipe(
            map((data)=>{
              const mentorData = data;
              return getMentorSuccess({mentor:mentorData});
            }),
            catchError((error) => {
              this.showMessage.showErrorToastr(error.error.message);
              return of(error.error.message);
            })
          )
        })
      )
  )
}
