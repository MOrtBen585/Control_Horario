import { Empleado } from './../../../shared/interfaces/Empleado.interface';
import { ChangeDetectionStrategy, Component, effect, inject, resource, signal } from '@angular/core';
import { EmpleadoTableComponent } from './components/empleado.table/empleado.table.component';
import { CommonModule } from '@angular/common';
import { EmpleadoFilterComponent } from './components/empleado.filter/empleado.filter.component';
import { EmpleadoFormComponent } from "../../../shared/formularios/EmpleadoForm/EmpleadoForm.component";
import { EmpleadoService } from '../../../app/services/Empleado.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../shared/pagination/pagination.service';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';


@Component({
  selector: 'home-empleados-page',
  imports: [EmpleadoTableComponent, EmpleadoFilterComponent, CommonModule, EmpleadoFormComponent, PaginationComponent],
  templateUrl: './empleados.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase EmpleadosPageComponent
 */
export class EmpleadosPageComponent {


  showAddEmpleado = false;
  empleadoSeleccionado = signal<Empleado | undefined>(undefined);
  empleadoService = inject(EmpleadoService);
  paginationService = inject(PaginationService);
  filteredEmployees = signal<Empleado[]>([]);
  searchTerm = signal<string>('');

  empleados = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      size: this.paginationService.currentSize(),
      sort: "nombre,asc",
    }),
    loader: ({ request }) =>
      this.empleadoService.getPaged(request),
  });


  eliminarEmpleado($event: number) {
    console.log('Empleado a eliminar desde el padre:', $event);
    this.empleadoService.delete($event).subscribe({
      next: () => {
        this.empleadoService.borrarCache(); // TODO Cambiar esto para no tener que borrar la caché
        this.empleados.reload();
      },
      error: (err) => {
        console.error('Error al eliminar empleado:', err);
      }
    });
  }

  borrarCache() {
    this.empleadoService.borrarCache();
  }


  abrirFormulario(empleado?: Empleado) {
    if (empleado) {
      this.empleadoSeleccionado.set(empleado);
    } else {
      this.empleadoSeleccionado.set(undefined); // nuevo empleado
    }
    this.showAddEmpleado = true;
    console.log(this.empleadoSeleccionado());
    console.log(this.showAddEmpleado);
  }

  cerrarFormulario() {
    this.showAddEmpleado = false;
    this.empleadoSeleccionado.set(undefined);
  }

  onSearch(searchTerm: string) {
    if (searchTerm.length === 0) {
      this.filteredEmployees.set([]);
      return;
    }
    const term = this.normalizarTexto(searchTerm);

    this.empleadoService.getAll().subscribe({
      next: (empleados) => {
        const empleadosFiltrados = empleados.filter(e => {
          const nombre = this.normalizarTexto(e.nombre);
          const apellidos = this.normalizarTexto(e.apellidos);
          return nombre.includes(term) || apellidos.includes(term);
        });

        this.filteredEmployees.set(empleadosFiltrados);
      },
      error: (err) => {
        console.error('Error al buscar empleados:', err);
      }
    });
  }


  /**
* Método normalizarTexto
* @param texto: string
* @returns string
*/
  private normalizarTexto(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')              // Descompone los caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos
      .trim();
  }

  guardarEmpleado(empleado: Empleado) {
    console.log('Guardando empleado...');

    if (empleado.id === undefined) {
      this.empleadoService.create(empleado).subscribe({
        next: (nuevoEmpleado) => {
          this.empleados.reload();
          this.cerrarFormulario();
        },
        error: (err: any) => {
          console.error('Error al guardar empleado:', err.error);
        }
      });
    } else {
      this.empleadoService.update(empleado.id, empleado).subscribe({
        next: (nuevoEmpleado) => {

          this.empleadoService.borrarCache(); // TODO Cambiar esto para que no haya que borrar la cache.
          this.empleados.reload();
          this.cerrarFormulario();
        },
        error: (err: any) => {
          console.error('Error al guardar empleado:', err.error);
        }
      });
    }

    // actualizarEmpleados() {
    //   this.empleadoService.getAll().subscribe({
    //     next: (empleadosActualizados) => {
    //       this.empleados.set(empleadosActualizados);
    //       this.filteredEmployees.set(empleadosActualizados);
    //       this.onSearch(''); // opcional: limpia filtro de búsqueda
    //     },
    //     error: (err) => {
    //       console.error('Error al actualizar empleados:', err);
    //     }
    //   });
  }

}


