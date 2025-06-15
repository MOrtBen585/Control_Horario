import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, NgModule, output, Output } from '@angular/core';

@Component({
  selector: 'empleado-filter',
  imports: [],
  templateUrl: './empleado.filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase EmpleadoFilterComponent
 */
export class EmpleadoFilterComponent {
  search = output<string>();
  itemsPerPage = 10;
  private debounceTimeout: any;


  onSearch(searchTerm: string) {
    this.search.emit(searchTerm);
  }

  limpiar(input: HTMLInputElement) {
    input.value = '';
    this.onSearch(''); // también lanza una búsqueda vacía
  }

  onInputChange(value: string) {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.onSearch(value);
    }, 1000); // 1000 ms = 1 segundo
  }



}
