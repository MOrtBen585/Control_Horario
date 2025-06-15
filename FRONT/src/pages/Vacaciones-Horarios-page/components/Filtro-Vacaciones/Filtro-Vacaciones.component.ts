import { Component, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtro-vacaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtro-vacaciones.component.html',
})
/**
 * Clase FiltroVacacionesComponent
 */
export class FiltroVacacionesComponent {
  search = output<string>();

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value);
  }
}
