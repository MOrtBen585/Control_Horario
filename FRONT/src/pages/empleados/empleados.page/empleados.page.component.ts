import { Empleado } from './../../../shared/interfaces/Empleado.interface';
import { ChangeDetectionStrategy, Component, effect, inject, resource, signal } from '@angular/core';
import { EmpleadoTableComponent } from './components/empleado.table/empleado.table.component';
import { CommonModule } from '@angular/common';
import { EmpleadoFilterComponent } from './components/empleado.filter/empleado.filter.component';
import { EmpleadoFormComponent } from "../../../shared/formularios/EmpleadoForm/EmpleadoForm.component";
import { MockService } from '../../../app/services/Mock.service';
import { EmpleadoService } from '../../../app/services/Empleado.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'home-empleados-page',
  imports: [EmpleadoTableComponent, EmpleadoFilterComponent, CommonModule, EmpleadoFormComponent],
  templateUrl: './empleados.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpleadosPageComponent {


  showAddEmpleado = false;
  empleadoSeleccionado = signal<Empleado | undefined>(undefined);
  empleadoService = inject(EmpleadoService);
  empleados = signal<Empleado[]>([]);


  filteredEmployees = signal<Empleado[]>([]);

  constructor() {
    console.log('Cargando empleados en el constructor...');
    this.empleadoService.getAll().subscribe(data => {
      console.log('data', data);
      console.log('Cargando empleados...');
      this.empleados.set(data);
      this.filteredEmployees.set(data);
    });
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
    const term = this.normalizarTexto(searchTerm);

    console.log('Buscando:', term);

    this.filteredEmployees.set(
      this.empleados().filter(e => {
        const nombre = this.normalizarTexto(e.nombre);
        const apellidos = this.normalizarTexto(e.apellidos);
        return nombre.includes(term) || apellidos.includes(term);
      })
    );
  }

  private normalizarTexto(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')              // Descompone los caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos
      .trim();
  }

  guardarEmpleado($event: Empleado) {
    console.log('Guardando empleado...');

    this.empleadoService.create($event).subscribe({
      next: (nuevoEmpleado) => {
        this.actualizarEmpleados();
        this.cerrarFormulario();
      },
      error: (err) => {
        console.error('Error al guardar empleado:', err);
      }
    });
  }


  actualizarEmpleados() {
    this.empleadoService.getAll().subscribe({
      next: (empleadosActualizados) => {
        this.empleados.set(empleadosActualizados);
        this.filteredEmployees.set(empleadosActualizados);
        this.onSearch(''); // opcional: limpia filtro de búsqueda
      },
      error: (err) => {
        console.error('Error al actualizar empleados:', err);
      }
    });
  }



}
