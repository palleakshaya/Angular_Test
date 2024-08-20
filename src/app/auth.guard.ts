import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const auth = localStorage.getItem('token');

  if (!auth) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
