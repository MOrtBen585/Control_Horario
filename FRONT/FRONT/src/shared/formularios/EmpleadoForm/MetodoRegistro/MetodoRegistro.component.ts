import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FotoUploaderComponent } from '../FotoUploader/FotoUploader.component';


@Component({
  selector: 'app-metodo-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FotoUploaderComponent],
  templateUrl: './metodoregistro.component.html',
})
export class MetodoRegistroComponent {
  @Input() formGroup!: FormGroup;

  get notificacionesCtrl(): FormControl {
    return this.formGroup.get('notificaciones') as FormControl;
  }

  get metodoValidacionCtrl(): FormControl {
    return this.formGroup.get('metodoValidacion') as FormControl;
  }

  get marcarInicioCtrl(): FormControl {
    return this.formGroup.get('marcarInicio') as FormControl;
  }

  get geolocalizableCtrl(): FormControl {
    return this.formGroup.get('geolocalizable') as FormControl;
  }

  get permitirCorreccionCtrl(): FormControl {
    return this.formGroup.get('permitirCorreccion') as FormControl;
  }

  get permitirHorasExtraCtrl(): FormControl {
    return this.formGroup.get('permitirHorasExtra') as FormControl;
  }

  get metodos(): FormGroup {
    return this.formGroup.get('metodos') as FormGroup;
  }

  get metodoAppMovilCtrl(): FormControl {
    return this.metodos.get('appMovil') as FormControl;
  }

  get metodoAppWebCtrl(): FormControl {
    return this.metodos.get('appWeb') as FormControl;
  }

  get metodoTelefonoCtrl(): FormControl {
    return this.metodos.get('telefono') as FormControl;
  }

  get metodoEmailCtrl(): FormControl {
    return this.metodos.get('email') as FormControl;
  }


}
