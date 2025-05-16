import { Route, Router } from '@angular/router';
import { AuthService } from './../../app/services/auth.service';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'shared-header',
  imports: [],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  user = signal<String>('');

  constructor(private auth: AuthService, private router: Router) {
    auth.whoami().subscribe(res => {
      localStorage.setItem('user', res.email);
      this.user.set(res.email);
    });
  }

  getUser() {
    return localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    this.auth.logout();
    this.router.navigate(['']);
  }

}
