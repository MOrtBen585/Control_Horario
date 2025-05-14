import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FotoUploaderComponent } from '../FotoUploader/FotoUploader.component';

@Component({
  selector: 'app-datos-laborales',
  imports: [CommonModule, FotoUploaderComponent, ReactiveFormsModule, FotoUploaderComponent],
  templateUrl: './DatosLaborales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatosLaboralesComponent {
  formGroup = input.required<FormGroup>();
}
