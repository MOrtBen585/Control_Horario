import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const NotAuthenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  try {
    const isAuthenticated = await firstValueFrom(
      auth.checkStatus().pipe(
        catchError(() => of(false)) // fallback si checkStatus lanza error
      )
    );

    console.log('✅ Guard check: isAuthenticated →', isAuthenticated);

    if (isAuthenticated) {
      router.navigate(['/home']);
      return false;
    }

    return true;
  } catch (err) {
    console.error('❌ Error en NotAuthenticatedGuard:', err);
    return true;
  }
};
