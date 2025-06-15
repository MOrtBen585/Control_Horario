import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FotoUploaderComponent } from '../../FotoUploader/FotoUploader.component';




@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FotoUploaderComponent],
  templateUrl: './permisos.component.html',
})
/**
 * Clase PermisosComponent
 */
export class PermisosComponent {
  formGroup = input.required<FormGroup>();

}
