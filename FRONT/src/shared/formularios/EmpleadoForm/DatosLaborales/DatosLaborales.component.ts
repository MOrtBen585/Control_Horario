import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FotoUploaderComponent } from '../FotoUploader/FotoUploader.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { HorarioService } from '../../../../app/services/Horario.service';

@Component({
  selector: 'app-datos-laborales',
  imports: [CommonModule, FotoUploaderComponent, ReactiveFormsModule, FotoUploaderComponent],
  templateUrl: './DatosLaborales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase DatosLaboralesComponent
 */
export class DatosLaboralesComponent {
  formGroup = input.required<FormGroup>();

  horarioService = inject(HorarioService);

  horarios = rxResource({
    loader: () => this.horarioService.getAll()
  });



}
