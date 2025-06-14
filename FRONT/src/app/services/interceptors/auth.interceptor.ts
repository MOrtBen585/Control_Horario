import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, of } from 'rxjs';
import { AuthService } from '../auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  // Añadir token si existe
  const authReq = accessToken
    ? req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && authService.getRefreshToken()) {
        // Intentar renovar el token
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newAccessToken = authService.getAccessToken();
            if (!newAccessToken) {
              authService.logout().subscribe();
              return throwError(() => new Error('No se pudo renovar el token'));
            }

            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newAccessToken}` }
            });
            return next(retryReq);
          }),
          catchError(refreshError => {
            authService.logout().subscribe();
            return throwError(() => refreshError);
          })
        );
      }

      // Otros errores (403, 500, etc.)
      return throwError(() => error);
    })
  );
};
