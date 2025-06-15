import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Empleado } from '../../shared/interfaces/Empleado.interface';
import { BuscadorVacacionesComponent } from './components/Buscador-Vacaciones/Buscador-Vacaciones.component';
import { FiltroVacacionesComponent } from './components/Filtro-Vacaciones/Filtro-Vacaciones.component';
import { TablaVacacionesComponent } from './components/Tabla-Vacaciones/Tabla-Vacaciones.component';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { EmpleadoService } from '../../app/services/Empleado.service';

@Component({
  selector: 'home-vacaciones-horarios-page',
  standalone: true,
  imports: [
    CommonModule,
    FiltroVacacionesComponent,
    TablaVacacionesComponent
  ],
  templateUrl: './vacaciones-horarios-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase VacacionesHorariosPageComponent
 */
export class VacacionesHorariosPageComponent {

  searchTerm = signal<string>('');
  modoVista = signal<'dia' | 'mes' | 'anio'>('mes');
  empleadoService = inject(EmpleadoService);
  fechaReferencia = signal(new Date());


  empleados = rxResource({
    loader: () => this.empleadoService.getAll(),
  })

  onSearch(term: string) {
    this.searchTerm.set(term);
  }

  cambiarVista(modo: 'dia' | 'mes' | 'anio') {
    this.modoVista.set(modo);
  }
}
