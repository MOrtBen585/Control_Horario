import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { FotoUploaderComponent } from '../FotoUploader/FotoUploader.component';

@Component({
  selector: 'app-activacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FotoUploaderComponent],
  templateUrl: './activacion.component.html',
})
export class ActivacionComponent {
  formGroup = input.required<FormGroup>();

  get bajaIndefinidaCtrl(): FormControl {
    return this.formGroup().get('bajaIndefinida') as FormControl;
  }

  get activoCtrl(): FormControl {
    return this.formGroup().get('activo') as FormControl;
  }
}
