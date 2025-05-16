import { ChangeDetectionStrategy, Component, input, Input, NgModule, signal, output } from '@angular/core';
import { Empleado } from '../../../../../shared/interfaces/Empleado.interface';
import { EmpleadoRowComponent } from '../empleado-row/empleado-row.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'empleado-table',
  imports: [CommonModule, DatePipe],
  templateUrl: './empleado.table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpleadoTableComponent {

  empleados = input<Empleado[]>([]);
  seleccionarEmpleado = output<Empleado>();

  onVerDetalles(empleado: Empleado) {
    this.seleccionarEmpleado.emit(empleado);
  }
}


