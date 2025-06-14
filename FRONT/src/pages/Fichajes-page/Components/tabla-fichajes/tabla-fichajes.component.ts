import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Fichaje } from '../../../../shared/interfaces/Fichaje.interface';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { SortFichajesPipe } from "../../../../app/pipes/sort-fichajes.pipe";


@Component({
  selector: 'app-tabla-fichajes',
  standalone: true,
  imports: [CommonModule, SortFichajesPipe],
  templateUrl: './tabla-fichajes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaFichajesComponent {

  // Entradas
  fichajes = input<Fichaje[]>([]);

  sortColumn = signal<string>('');
  sortDirection = signal<'asc' | 'desc'>('asc');


  setSortColumn(column: string) {
    if (this.sortColumn() === column) {
      // Alternar entre ascendente y descendente
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }


}
