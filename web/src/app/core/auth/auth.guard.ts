import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Auth guard to protect routes from unauthenticated access.
 * Redirects to login if user is not authenticated.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasValidTokens()) {
    return true;
  }

  // If not authenticated, initiate login flow
  authService.login();
  return false;
};
