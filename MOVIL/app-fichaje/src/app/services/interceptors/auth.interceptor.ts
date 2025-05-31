import { inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { from, switchMap } from "rxjs";
import { Preferences } from "@capacitor/preferences";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);

  // Obtener token desde Capacitor Preferences
  return from(Preferences.get({ key: 'accessToken' })).pipe(
    switchMap(({ value: token }) => {
      if (token) {
        const newReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next(newReq);
      }
      return next(req);
    })
  );
}
