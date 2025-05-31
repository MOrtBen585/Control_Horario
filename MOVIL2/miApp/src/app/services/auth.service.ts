import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

import { rxResource } from '@angular/core/rxjs-interop';
import { LoginRequest } from '../interfaces/LoginRequest.interface';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://192.168.31.234:8080/auth';
  private _token = signal<string | null>(localStorage.getItem('accessToken'));
  private _authStatus = signal<AuthStatus>('checking');
  private _userId = signal<number | null>(null);
  private _userEmail = signal<string | null>(null);
  private _userRole = signal<string | null>(null);

  userId = computed(() => this._userId());
  userEmail = computed(() => this._userEmail());
  userRole = computed(() => this._userRole());

  checkStatusResource = rxResource({
    loader: () => this.checkStatus()
  });

  http = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') {
      return 'checking'; // ← corregido el typo
    }
    if (this._token()) {
      return 'authenticated';
    }
    return 'unauthenticated';
  });

  token = computed<string | null>(() => {
    return this._token();
  });



  login(email: string, password: string): Observable<boolean> {
    const body = { email, password };

    return this.http.post<LoginRequest>(`${this.baseUrl}/login`, body).pipe(
      tap((res) => {
        if (res.accessToken && res.refreshToken) {
          this._authStatus.set('authenticated');
          this._token.set(res.accessToken);

          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);

          console.log('✅ Token guardado:', res.accessToken);
        } else {
          console.warn('⚠️ Tokens no presentes en la respuesta');
        }
      }),
      map(() => true),
      catchError((err) => {
        console.error('❌ Error en login():', err);
        this.logout(); // Limpia estado si falla
        return of(false);
      })
    );
  }




  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return this.HandleAuthError('Token no encontrado');
    }

    // Simular un LoginRequest ficticio con el token actual
    const fakeLogin: LoginRequest = {
      accessToken: token,
      refreshToken: this.getRefreshToken() || ''
    };

    return this.handleAuthSuccess(fakeLogin);
  }



  logout(): Observable<any> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this._token.set(null);
    this._authStatus.set('unauthenticated');
    this._userId.set(null);
    this._userEmail.set(null);
    this._userRole.set(null);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`
    });
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers });
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.baseUrl}/refresh`, { refreshToken }).pipe(
      tap((res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
      })
    );
  }

  whoami(): Observable<any> {
    // Token cargado con authInterceptor
    return this.http.get(`${this.baseUrl}/whoami`);
  }

  checkToken(): Observable<any> {
    // Token cargado con authInterceptor
    return this.http.get(`${this.baseUrl}/check`);
  }

  getRole(): Observable<any> {
    // Token cargado con authInterceptor
    return this.http.get(`${this.baseUrl}/role`);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  private handleAuthSuccess(res: LoginRequest): Observable<boolean> {
    this._authStatus.set('authenticated');
    this._token.set(res.accessToken);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);

    // Tras guardar los tokens, obtener info del usuario
    return this.http.get<{ id: number, email: string, rol: string }>(`${this.baseUrl}/whoami`).pipe(
      tap((whoami) => {
        console.log('✅ Auth success: whoami →', whoami);
        this._userId.set(whoami.id);
        this._userEmail.set(whoami.email);
        this._userRole.set(whoami.rol);
        console.log('✅ Auth success: userId →', this._userId());
      }),
      map(() => true),
      catchError((err) => this.HandleAuthError(err))
    );
  }

  private HandleAuthError(error: any): Observable<boolean> {
    console.error('❌ Auth error:', error);
    this.logout();
    return of(false);
  }

}
