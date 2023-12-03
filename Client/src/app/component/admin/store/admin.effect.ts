import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginAdmin, loginAdminSuccess } from './admin.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin-service.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Injectable()
export class AdminEffect {
  constructor(
    private action$: Actions,
    private adminService: AdminService,
    private router: Router,
    private showMessage: MessageToastrService
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
              this.showMessage.showSuccessToastr(userData.message);
              this.router.navigate(['/admin/']);
              return loginAdminSuccess({ admin: userData.accessedMentee });
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
