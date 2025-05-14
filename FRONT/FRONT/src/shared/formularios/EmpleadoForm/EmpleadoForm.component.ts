import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, SimpleChanges, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Empleado } from '../../interfaces/Empleado.interface';

// Subcomponentes
import { DatosGeneralesComponent } from './datos-generales/datos-generales.component';
import { DatosLaboralesComponent } from './DatosLaborales/DatosLaborales.component';
import { FotoEmpleadoComponent } from './FotoEmpleado/FotoEmpleado.component';
import { CalendarioComponent } from './CalendarioPest/CalendarioPest.component';
import { MetodoRegistroComponent } from './MetodoRegistro/MetodoRegistro.component';
import { PermisosComponent } from './components/Permisos/Permisos.component';
import { ActivacionComponent } from './activacion/activacion.component';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  templateUrl: './EmpleadoForm.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FotoEmpleadoComponent,
    DatosGeneralesComponent,
    DatosLaboralesComponent,
    CalendarioComponent,
    MetodoRegistroComponent,
    PermisosComponent,
    ActivacionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpleadoFormComponent implements OnInit, OnChanges {
  @Input() empleado?: Empleado;
  estaEditando = signal<boolean>(false);
  cerrarVentana = output<boolean>();
  guardarEmpleado = output<Empleado>();

  formGroup: FormGroup;

  tabs = [
    { label: 'Datos generales' },
    { label: 'Datos laborales' },
    { label: 'Calendario' },
    { label: 'Método de registro' },
    { label: 'Permisos' },
    { label: 'Activación' },
  ];

  activeTab = 0;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      ccc: [''],
      foto: [''],
      nombre: [''],
      apellidos: [''],
      calendario: [''],
      dni: [''],
      telefono: [''],
      email: [''],
      fechaNacimiento: [''],
      genero: [''],
      convenio: [''],
      horario: [''],
      tipoContrato: [''],
      contratoDesde: [''],
      indefinido: [false],
      centro: [''],
      puesto: [''],
      politicaVacaciones: [''],
      frecuenciaFirma: [''],
      notificaciones: [false],
      metodoValidacion: [''],
      permisosPorDefecto: [''],
      permisosExtra: [''],
      bajaIndefinida: [false],
      activo: [true],
      metodos: this.fb.group({
        appMovil: [false],
        appWeb: [false],
        telefono: [false],
        email: [false],
      }),
      marcarInicio: [false],
      geolocalizable: [false],
      permitirCorreccion: [false],
      permitirHorasExtra: [false],
    });
  }

  ngOnInit() {
    this.cargarEmpleadoSiAplica();

    console.log('Empleado:', this.empleado);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['empleado'] && !changes['empleado'].firstChange) {
      this.cargarEmpleadoSiAplica();
      console.log('Cambios en empleado:', changes['empleado'].currentValue);
    }
  }

  cargarEmpleadoSiAplica() {
    if (this.empleado) {
      this.formGroup.patchValue(this.empleado);
      this.estaEditando.set(true);
    } else {
      this.formGroup.reset();
    }
  }


  setActiveTab(index: number) {
    this.activeTab = index;
  }

  guardar() {
    if (this.formGroup.valid) {
      const datosEmpleado = this.formGroup.value;
      // TODO Aquí hay que traer el empleado del back para asignarle el ID
      datosEmpleado.id = 10;
      console.log('Datos completos del formulario:', datosEmpleado);
      // Aquí podrías emitir un evento o llamar a un servicio
      this.guardarEmpleado.emit(datosEmpleado as Empleado);
    } else {
      console.log('Formulario inválido');
      this.formGroup.markAllAsTouched();
    }
  }

  cancelar() {
    // Aquí puedes emitir un evento para cerrar el modal si lo necesitas
    this.cerrarVentana.emit(true);
  }
}
