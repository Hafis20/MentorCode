import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';

  // If admin is logged in
export const adminAuthGuard:CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (authService.checkAdminLoggedIn()) {
    router.navigate(['/admin/dashboard']);
    return false;
  } else {
    return true;
  }
};

