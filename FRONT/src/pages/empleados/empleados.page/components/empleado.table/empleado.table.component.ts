import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Empleado } from '../../../../../shared/interfaces/Empleado.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { FilterByPipe } from '../../../../../app/pipes/filter-by.pipe';
import { SortByPipe } from '../../../../../app/pipes/sort-by.pipe';

@Component({
  selector: 'empleado-table',
  imports: [CommonModule, DatePipe, SortByPipe, FilterByPipe],
  templateUrl: './empleado.table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpleadoTableComponent {

  empleados = input<Empleado[]>([]);
  empleadosFiltrados = input<Empleado[]>([]);
  seleccionarEmpleado = output<Empleado>();
  eliminarEmpleado = output<number>(); // 👈 nuevo output
  ordenarPor = signal<keyof Empleado | null>(null);
  filterBy = input<string>('');

  onVerDetalles(empleado: Empleado) {
    this.seleccionarEmpleado.emit(empleado);
  }

  onEliminar(empleado: Empleado) {
    this.eliminarEmpleado.emit(empleado.id);
    console.log('Emitir ID para eliminar:', empleado.id);
  }

}


