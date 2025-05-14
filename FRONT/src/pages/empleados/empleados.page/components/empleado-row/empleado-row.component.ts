import { ChangeDetectionStrategy, Component, input, Input, output, signal } from '@angular/core';
import { Empleado } from '../../../../../shared/interfaces/Empleado.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleado-row',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleado-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})




export class EmpleadoRowComponent {

  empleado = input.required<Empleado>();
  detalle = output<Empleado>();

  onClickVerDetalles() {
    this.detalle.emit(this.empleado());
    // 👆 OJO: empleado es un Signal, necesitas llamarlo como una función
  }
}



