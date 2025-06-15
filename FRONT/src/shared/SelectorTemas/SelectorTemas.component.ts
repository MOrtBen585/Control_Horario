import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-selector-temas',
  imports: [CommonModule],
  templateUrl: './SelectorTemas.component.html',

})
/**
 * Clase SelectorTemasComponent
 */
export class SelectorTemasComponent {
  temas: string[] = [
    "light", "dark", "forest", "dracula", "synthwave", "cupcake", "corporate"
  ];

  /**
 * Método cambiarTema
 * @param tema: string
 * @returns void 
 */
cambiarTema(tema: string): void {
    document.documentElement!.setAttribute('data-theme', tema);
  }

}
