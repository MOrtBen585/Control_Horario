import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl: './unauthorized.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase UnauthorizedComponent
 */
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/login']);
  }
}
