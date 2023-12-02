import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginAdmin, loginAdminSuccess } from './admin.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AdminEffect {
  constructor(
    private action$: Actions,
    private adminService: AdminService,
    private router: Router,
    private toastr:ToastrService,
  ) {}

  _loginAdmin$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginAdmin),
      exhaustMap((action) => {
        return this.adminService.login(action.data).pipe(
          map((data) => {
            if (data) {
              const userData = data;
              localStorage.setItem('adminToken', userData.accessToken);
              this.toastr.success(userData.message, '', {
               timeOut: 2000,
               progressAnimation: 'increasing',
               progressBar: true,
             });
              this.router.navigate(['admin-dashboard']);
              return loginAdminSuccess({ admin: userData.accessedMentee });
            } else {
              return;
            }
          }),
          catchError((error) => {
            this.toastr.error('Invalid Credentials', '', {
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
