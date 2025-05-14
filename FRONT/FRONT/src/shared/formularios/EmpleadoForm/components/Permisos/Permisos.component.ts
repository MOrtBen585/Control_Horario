import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FotoUploaderComponent } from '../../FotoUploader/FotoUploader.component';


@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FotoUploaderComponent],
  templateUrl: './permisos.component.html',
})
export class PermisosComponent {
  @Input() formGroup!: FormGroup;

  get permisosPorDefectoCtrl(): FormControl {
    return this.formGroup.get('permisosPorDefecto') as FormControl;
  }

  get permisosExtraCtrl(): FormControl {
    return this.formGroup.get('permisosExtra') as FormControl;
  }
}
