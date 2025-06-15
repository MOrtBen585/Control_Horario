import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FotoUploaderComponent } from '../FotoUploader/FotoUploader.component';

@Component({
  selector: 'app-datos-generales',
  imports: [CommonModule, FotoUploaderComponent, ReactiveFormsModule],
  templateUrl: './datos-generales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase DatosGeneralesComponent
 */
export class DatosGeneralesComponent {
  formGroup = input.required<FormGroup>();
}
