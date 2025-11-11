import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PerfisAuth } from '../models/auth.models';

export const AuthGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/login'));
};

export const AdminRouteGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.perfil === PerfisAuth.ADMIN) {
    return true;
  } else if (authService.isAuthenticated) {
    return new RedirectCommand(router.parseUrl('/hub'));
  }
  return new RedirectCommand(router.parseUrl('/login'));
};
