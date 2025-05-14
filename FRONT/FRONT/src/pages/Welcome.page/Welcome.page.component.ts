import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'welcome-page',
  imports: [RouterLink],
  templateUrl: './Welcome.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent { }
