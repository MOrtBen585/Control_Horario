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
/**
 * Clase MetodoRegistroComponent
 */
export class MetodoRegistroComponent {
  @Input() formGroup!: FormGroup;

  get /**
 * Método notificacionesCtrl
 * @param 
 * @returns FormControl 
 */
notificacionesCtrl(): FormControl {
    return this.formGroup.get('notificaciones') as FormControl;
  }

  get /**
 * Método metodoValidacionCtrl
 * @param 
 * @returns FormControl 
 */
metodoValidacionCtrl(): FormControl {
    return this.formGroup.get('metodoValidacion') as FormControl;
  }

  get /**
 * Método marcarInicioCtrl
 * @param 
 * @returns FormControl 
 */
marcarInicioCtrl(): FormControl {
    return this.formGroup.get('marcarInicio') as FormControl;
  }

  get /**
 * Método geolocalizableCtrl
 * @param 
 * @returns FormControl 
 */
geolocalizableCtrl(): FormControl {
    return this.formGroup.get('geolocalizable') as FormControl;
  }

  get /**
 * Método permitirCorreccionCtrl
 * @param 
 * @returns FormControl 
 */
permitirCorreccionCtrl(): FormControl {
    return this.formGroup.get('permitirCorreccion') as FormControl;
  }

  get /**
 * Método permitirHorasExtraCtrl
 * @param 
 * @returns FormControl 
 */
permitirHorasExtraCtrl(): FormControl {
    return this.formGroup.get('permitirHorasExtra') as FormControl;
  }

  get /**
 * Método metodos
 * @param 
 * @returns FormGroup 
 */
metodos(): FormGroup {
    return this.formGroup.get('metodos') as FormGroup;
  }

  get /**
 * Método metodoAppMovilCtrl
 * @param 
 * @returns FormControl 
 */
metodoAppMovilCtrl(): FormControl {
    return this.metodos.get('appMovil') as FormControl;
  }

  get /**
 * Método metodoAppWebCtrl
 * @param 
 * @returns FormControl 
 */
metodoAppWebCtrl(): FormControl {
    return this.metodos.get('appWeb') as FormControl;
  }

  get /**
 * Método metodoTelefonoCtrl
 * @param 
 * @returns FormControl 
 */
metodoTelefonoCtrl(): FormControl {
    return this.metodos.get('telefono') as FormControl;
  }

  get /**
 * Método metodoEmailCtrl
 * @param 
 * @returns FormControl 
 */
metodoEmailCtrl(): FormControl {
    return this.metodos.get('email') as FormControl;
  }


}
