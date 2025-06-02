import { Route, Router } from '@angular/router';
import { AuthService } from './../../app/services/auth.service';
import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'shared-header',
  imports: [],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {


  auth = inject(AuthService);
  router = inject(Router);


  user = this.auth.userEmail();

  getUser() {
    return localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    this.auth.logout();
    this.router.navigate(['']);
  }

}
