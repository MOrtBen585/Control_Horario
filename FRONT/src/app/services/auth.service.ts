import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { LoginRequest } from '../../shared/interfaces/Login-Request.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { VariablesEntorno } from '../variablesEntorno';
import { ConexionConfig } from '../config/Conexion.config';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';
@Injectable({
  providedIn: 'root'
})
/**
 * Clase AuthService
 */
export class AuthService {

  private conexion = inject(ConexionConfig).server;

  private baseUrl = `${this.conexion}/auth`;
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



  /**
 * Método login
 * @param email: string, password: string
 * @returns Observable<boolean>
 */
  login(email: string, password: string): Observable<boolean> {
    const body = { email, password };
    return this.http.post<LoginRequest>(`${this.baseUrl}/login`, body).pipe(
      switchMap((res) => this.handleAuthSuccess(res)),
      catchError((error) => this.HandleAuthError(error)),
    );
  }



  /**
 * Método checkStatus
 * @param
 * @returns Observable<boolean>
 */
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



  /**
 * Método logout
 * @param
 * @returns Observable<any>
 */
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

  /**
 * Método refreshToken
 * @param
 * @returns Observable<any>
 */
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.baseUrl}/refresh`, { refreshToken }).pipe(
      tap((res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
      })
    );
  }

  /**
 * Método whoami
 * @param
 * @returns Observable<any>
 */
  whoami(): Observable<any> {
    // Token cargado con authInterceptor
    return this.http.get(`${this.baseUrl}/whoami`);
  }

  /**
 * Método checkToken
 * @param
 * @returns Observable<any>
 */
  checkToken(): Observable<any> {
    // Token cargado con authInterceptor
    return this.http.get(`${this.baseUrl}/check`);
  }

  /**
 * Método getRole
 * @param
 * @returns Observable<any>
 */
  getRole(): Observable<any> {
    // Token cargado con authInterceptor
    return this.http.get(`${this.baseUrl}/role`);
  }

  /**
 * Método getAccessToken
 * @param
 * @returns string | null
 */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
 * Método getRefreshToken
 * @param
 * @returns string | null
 */
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  /**
 * Método isLoggedIn
 * @param
 * @returns boolean
 */
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  /**
* Método handleAuthSuccess
* @param res: LoginRequest
* @returns Observable<boolean>
*/
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

  /**
* Método HandleAuthError
* @param error: any
* @returns Observable<boolean>
*/
  private HandleAuthError(error: any): Observable<boolean> {
    console.error('❌ Auth error:', error);
    this.logout();
    return of(false);
  }

}
