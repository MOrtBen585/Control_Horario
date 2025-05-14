import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { FotoUploaderComponent } from '../FotoUploader/FotoUploader.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FotoUploaderComponent],
  templateUrl: './calendariopest.component.html',
})
export class CalendarioComponent {
  formGroup = input.required<FormGroup>();

  get calendarioCtrl(): FormControl {
    return this.formGroup()!.get('calendario') as FormControl;
  }

  verCalendario() {
    alert('Mostrar calendario laboral en un modal o vista aparte');
  }
}
