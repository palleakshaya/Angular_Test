import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);
  const auth = JSON.parse(localStorage.getItem('token') ?? 'false') as boolean;

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
