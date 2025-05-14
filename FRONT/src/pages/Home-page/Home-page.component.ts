import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AsideComponent } from '../../shared/aside/aside.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, AsideComponent, FooterComponent, RouterOutlet],
  templateUrl: './Home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent { }
