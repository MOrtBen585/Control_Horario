import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Fichaje } from '../interfaces/Fichaje.interface';

@Component({
  selector: 'app-paginated',
  imports: [CommonModule],
  templateUrl: './paginated.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatedComponent {
  onPageSizeChange($event: Event) {
    throw new Error('Method not implemented.');
  }
  // Entradas
  paginaActual = input<number>(0);
  numOfPages = input<number>(0);
  pageSize = signal(10); // estado interno

  // Salidas
  page = output<number>();
  pageSizeEmitter = output<number>();

  // Cambiar página
  actualizarPagina(nuevaPagina: number): void {
    this.page.emit(nuevaPagina); // emite el nuevo número de página
  }

  // Cambiar tamaño de página

}
