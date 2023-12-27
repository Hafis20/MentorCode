import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AdminService } from '../services/admin-service.service';

// Checking the admin is logged in 
export const LoginAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AdminService)
  const router = inject(Router);

  if(authService.checkAdminLoggedIn()){
    return true;
  }else{
    router.navigate(['/admin/login']);
    return false;
  }
};

// Checking the admin is logged out
export const LoggedInAuthGuard:CanActivateFn = (route,state)=>{
  const authService = inject(AdminService)
  const router = inject(Router);
  
  if(authService.checkAdminLoggedIn()){
    router.navigate(['/admin/dashboard'])
    return false;
  }else{
    return true;
  }
}
