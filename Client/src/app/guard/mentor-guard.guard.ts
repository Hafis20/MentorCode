import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

// If mentor is not logged in then redirect to login page;
export const MentorLoginAuthGuard: CanActivateFn = (route, state) => {
  const  mentorAuth = inject(AuthServiceService);
  const router = inject(Router);
  
  // Checking
  if(mentorAuth.checkMentorLoggedIn()){
    return true;
  }else{
    router.navigate(['/mentor/login']);
    return false;
  }
};

// If mentor is already loggedin then redirect to mentor dashboard;
export const MentorLoggedOutAuthGuard:CanActivateFn= (route,state)=>{
   const mentorAuth = inject(AuthServiceService);
   const router = inject(Router);

   // checking
   if(mentorAuth.checkMentorLoggedIn()){
    router.navigate(['/mentor/dashboard']);
    return false;
   }else{
    return true;
   }
}
