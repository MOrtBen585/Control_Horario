import { inject } from '@angular/core';
import { Router, type CanMatchFn, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

export const adminGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return of(router.parseUrl('/login'));
  }

  return auth.getRole().pipe(
    map((res) => {
      if (res.role === 'ROLE_ADMIN') {
        return true;
      } else {
        return router.parseUrl('/unauthorized'); // redirige si no es admin
      }
    })
  );
};
