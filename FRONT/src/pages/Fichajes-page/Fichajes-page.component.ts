import { PaginationService } from './../../shared/pagination/pagination.service';
import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { FiltroFichajesComponent } from './Components/filtro-fichajes/filtro-fichajes.component';
import { TablaFichajesComponent } from './Components/tabla-fichajes/tabla-fichajes.component';
import { CommonModule } from '@angular/common';
import { FichajeService } from '../../app/services/Fichaje.service';
import { EmpleadoService } from '../../app/services/Empleado.service';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Fichaje } from '../../shared/interfaces/Fichaje.interface';
import { PaginatedResponse } from '../../shared/interfaces/Pagitated-Response.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "../../shared/pagination/pagination.component";


@Component({
  selector: 'home-fichajes-page',
  standalone: true,
  imports: [FiltroFichajesComponent, TablaFichajesComponent, CommonModule, PaginationComponent],
  templateUrl: './Fichajes-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FichajesPageComponent {

  private fichajeS = inject(FichajeService);
  paginationService = inject(PaginationService);


  fichajes = signal<Fichaje[]>([]);
  fichajesFiltrados = signal<Fichaje[]>([]);

  currentPage = signal(0);
  totalPages = signal<number>(0);
  pageSize = signal<number>(10);

  fichajesResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      size: this.paginationService.currentSize(),
      sort: "fecha,desc",
    }),
    loader: ({ request }) =>
      this.fichajeS.obtenerTodosLosFichajesActivos(request),
  });

  actualizarFiltro(filtrados: Fichaje[]): void {
    this.fichajesFiltrados.set(filtrados);
  }

}
