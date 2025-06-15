import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'component-navbar',
  imports: [RouterLink],
  templateUrl: './Navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase NavbarComponent
 */
export class NavbarComponent {
  desplegado = signal<boolean>(false);
}
