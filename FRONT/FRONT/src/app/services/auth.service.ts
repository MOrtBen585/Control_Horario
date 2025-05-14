import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key = 'usuario';

  login(email: string, password: string): boolean {
    if (email === 'admin@empresa.com' && password === 'admin') {
      localStorage.setItem(this.key, email);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.key);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.key);
  }

  getUser(): string | null {
    return localStorage.getItem(this.key);
  }

}
