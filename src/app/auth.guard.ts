import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const auth = JSON.parse(localStorage.getItem('token') ?? 'false') as boolean;

  if (!auth) {
    router.navigate(['/orders']);
  }

  return auth;
};
