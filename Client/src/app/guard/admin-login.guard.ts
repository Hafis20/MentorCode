import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
 
// If admin is not loggedIn
export const adminLoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (authService.checkAdminLoggedIn()) {
    return true;
  } else {
    router.navigate(['/admin/login']);
    return false;
  }
};

