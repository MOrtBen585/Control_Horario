import { Route, Router } from '@angular/router';
import { AuthService } from './../../app/services/auth.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-header',
  imports: [],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  user: string | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.user = auth.getUser();
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
