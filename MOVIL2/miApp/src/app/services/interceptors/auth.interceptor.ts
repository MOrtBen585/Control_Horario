import { inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { HttpRequest } from "@angular/common/module.d-CnjH8Dlt";
import { HttpHandlerFn } from "@angular/common/http";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const authToken = authService.token();

  if (authToken) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${authToken}`),
    });
    return next(newReq);
  }

  // Si no hay token, pasa la request tal cual
  return next(req);
}
