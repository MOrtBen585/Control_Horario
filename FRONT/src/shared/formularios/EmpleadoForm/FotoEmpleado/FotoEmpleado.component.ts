import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-foto-empleado',
  imports: [CommonModule],
  templateUrl: './FotoEmpleado.component.html',
})
export class FotoEmpleadoComponent {
  formGroup = input.required<FormGroup>();

}
