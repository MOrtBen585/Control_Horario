import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs';

import { LoginRequest } from '../interfaces/LoginRequest.interface';
import { Preferences } from '@capacitor/preferences';
import { ConexionConfig } from '../config/conexion.config';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server = inject(ConexionConfig).server;
  private baseUrl = `${this.server}/auth`;

  private _token = signal<string | null>(null);
  private _authStatus = signal<AuthStatus>('checking');
  private _userId = signal<number | null>(null);
  private _userEmail = signal<string | null>(null);
  private _userRole = signal<string | null>(null);

  userId = computed(() => this._userId());
  userEmail = computed(() => this._userEmail());
  userRole = computed(() => this._userRole());

  http = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    return this._token() ? 'authenticated' : 'unauthenticated';
  });

  token = computed<string | null>(() => this._token());

  constructor() {
    // Carga el token al iniciar el servicio
    this.loadToken();
  }

  private async loadToken() {
    const { value } = await Preferences.get({ key: 'accessToken' });
    if (value) {
      this._token.set(value);
      this._authStatus.set('authenticated');
    } else {
      this._authStatus.set('unauthenticated');
    }
  }

  login(email: string, password: string): Observable<boolean> {
    const body = { email, password };

    return this.http.post<LoginRequest>(`${this.baseUrl}/login`, body).pipe(
      switchMap((res) => {
        if (res.accessToken && res.refreshToken) {
          return from(this.saveTokens(res)).pipe(
            switchMap(() => this.handleAuthSuccess(res))
          );
        } else {
          return of(false);
        }
      }),
      catchError(err => {
        console.error('❌ Error en login:', err);
        this.logout(); // limpieza en caso de error
        return of(false);
      })
    );
  }

  private async saveTokens(res: LoginRequest) {
    this._token.set(res.accessToken);
    this._authStatus.set('authenticated');
    await Preferences.set({ key: 'accessToken', value: res.accessToken });
    await Preferences.set({ key: 'refreshToken', value: res.refreshToken });
  }

  checkStatus(): Observable<boolean> {
    return from(Preferences.get({ key: 'accessToken' })).pipe(
      switchMap(({ value }) => {
        if (!value) {
          return this.HandleAuthError('Token no encontrado');
        }

        const fakeLogin: LoginRequest = {
          accessToken: value,
          refreshToken: '' // refreshToken no es requerido aquí
        };

        return this.handleAuthSuccess(fakeLogin);
      })
    );
  }

  logout(): Observable<any> {
    const currentToken = this._token(); // guarda el token actual

    const headers = new HttpHeaders({
      Authorization: `Bearer ${currentToken}`
    });

    return this.http.post(`${this.baseUrl}/logout`, {}, { headers }).pipe(
      catchError(err => {
        console.error('Error durante logout:', err);
        return of(null); // igual continuar con limpieza
      }),
      tap(() => {
        this._token.set(null);
        this._authStatus.set('unauthenticated');
        this._userId.set(null);
        this._userEmail.set(null);
        this._userRole.set(null);
        Preferences.remove({ key: 'accessToken' });
        Preferences.remove({ key: 'refreshToken' });
      })
    );
  }


  refreshToken(): Observable<any> {
    return from(Preferences.get({ key: 'refreshToken' })).pipe(
      switchMap(({ value }) =>
        this.http.post(`${this.baseUrl}/refresh`, { refreshToken: value }).pipe(
          tap(async (res: any) => {
            await Preferences.set({ key: 'accessToken', value: res.accessToken });
            this._token.set(res.accessToken);
          })
        )
      )
    );
  }

  whoami(): Observable<any> {
    return this.http.get(`${this.baseUrl}/whoami`);
  }

  getRole(): Observable<any> {
    return this.http.get(`${this.baseUrl}/role`);
  }

  private handleAuthSuccess(res: LoginRequest): Observable<boolean> {
    this._authStatus.set('authenticated');
    this._token.set(res.accessToken);

    return this.http.get<{ id: number, email: string, rol: string }>(`${this.baseUrl}/whoami`).pipe(
      tap((whoami) => {
        this._userId.set(whoami.id);
        this._userEmail.set(whoami.email);
        this._userRole.set(whoami.rol);
      }),
      map(() => true),
      catchError(err => this.HandleAuthError(err))
    );
  }

  private HandleAuthError(error: any): Observable<boolean> {
    console.error('❌ Auth error:', error);
    this.logout();
    return of(false);
  }

}
