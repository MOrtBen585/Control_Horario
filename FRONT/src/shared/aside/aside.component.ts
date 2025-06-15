import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../components/Navbar/Navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-aside',
  imports: [NavbarComponent, RouterLink],
  templateUrl: './aside.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase AsideComponent
 */
export class AsideComponent { }
