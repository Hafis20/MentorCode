import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

// Checking if the user is login;
export const MenteeLoginAuthGuard: CanActivateFn = (route, state) => {
  const menteeAuth = inject(AuthServiceService);
  const router = inject(Router);

  if (menteeAuth.checkMenteeLoggedIn()) {
    return true;
  } else {
    router.navigate(['/mentee/login']);
    return false;
  }
};

// Checking if the user is logged out or not
export const MenteeLoggedOutAuth: CanActivateFn = (route, state) => {
  const menteeAuth = inject(AuthServiceService);
  const router = inject(Router);

  if (menteeAuth.checkMenteeLoggedIn()) {
    router.navigate(['/mentee/list-mentors']);
    return false;
  } else {
    return true;
  }
};
