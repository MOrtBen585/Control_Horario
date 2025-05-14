import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FiltroFichajesComponent } from './Components/filtro-fichajes/filtro-fichajes.component';
import { Fichaje } from '../../shared/interfaces/Fichaje.interface';
import { Empleado } from '../../shared/interfaces/Empleado.interface';
import { TablaFichajesComponent } from './Components/tabla-fichajes/tabla-fichajes.component';
import { CommonModule } from '@angular/common';
import { MockService } from '../../app/services/Mock.service';

@Component({
  selector: 'home-fichajes-page',
  imports: [FiltroFichajesComponent, TablaFichajesComponent, CommonModule],
  templateUrl: './Fichajes-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FichajesPageComponent {

  mockService = inject(MockService);

  fichajes = signal<Fichaje[]>([]);
  fichajesFiltrados = signal<Fichaje[]>([]);

  constructor() {
    this.fichajes.set(this.mockService.FICHAJES_MOCK);
    this.fichajesFiltrados.set(this.fichajes());
  }

  actualizarFiltro(filtrados: Fichaje[]) {
    this.fichajesFiltrados.set(filtrados);
  }

}
