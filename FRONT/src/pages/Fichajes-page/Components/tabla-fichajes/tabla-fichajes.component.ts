import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Fichaje } from '../../../../shared/interfaces/Fichaje.interface';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';


@Component({
  selector: 'app-tabla-fichajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-fichajes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaFichajesComponent {

  // Entradas
  fichajes = input<Fichaje[]>([]);

}
