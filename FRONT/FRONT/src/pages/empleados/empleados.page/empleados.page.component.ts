import { Empleado } from './../../../shared/interfaces/Empleado.interface';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EmpleadoTableComponent } from './components/empleado.table/empleado.table.component';
import { CommonModule } from '@angular/common';
import { EmpleadoFilterComponent } from './components/empleado.filter/empleado.filter.component';
import { EmpleadoFormComponent } from "../../../shared/formularios/EmpleadoForm/EmpleadoForm.component";
import { SelectorTemasComponent } from "../../../shared/SelectorTemas/SelectorTemas.component";
import { MockService } from '../../../app/services/Mock.service';

@Component({
  selector: 'home-empleados-page',
  imports: [EmpleadoTableComponent, EmpleadoFilterComponent, CommonModule, EmpleadoFormComponent],
  templateUrl: './empleados.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpleadosPageComponent {

  filteredEmployees = signal<Empleado[]>([]);
  showAddEmpleado = false;
  empleadoSeleccionado = signal<Empleado | undefined>(undefined);
  mockService = inject(MockService);

  empleados = signal<Empleado[]>([]);

  constructor() {
    this.empleados.set(this.mockService.empleados);
    this.filteredEmployees.set(this.empleados());
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
    this.mockService.empleados.push($event);
    this.cerrarFormulario();
    this.actualizarEmpleados();
  }

  actualizarEmpleados() {
    this.empleados.set(this.mockService.empleados);
    this.filteredEmployees.set(this.empleados());
    this.onSearch('');
  }


}
