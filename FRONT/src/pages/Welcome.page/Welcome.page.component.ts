import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'welcome-page',
  imports: [],
  templateUrl: './Welcome.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase WelcomePageComponent
 */
export class WelcomePageComponent {
  auth = inject(AuthService);
  router = inject(Router);
  login() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
