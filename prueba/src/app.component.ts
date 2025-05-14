
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  temas = ['light', 'dark', 'forest', 'dracula', 'cupcake', 'synthwave'];

  cambiarTema(tema: string): void {
    document.documentElement.setAttribute('data-theme', tema);
  }
}
