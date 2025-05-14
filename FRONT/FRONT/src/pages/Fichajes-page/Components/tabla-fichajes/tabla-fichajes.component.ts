import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Fichaje } from '../../../../shared/interfaces/Fichaje.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-fichajes',
  imports: [CommonModule],
  templateUrl: './tabla-fichajes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaFichajesComponent {
  fichajes = input<Fichaje[]>([]);
}
