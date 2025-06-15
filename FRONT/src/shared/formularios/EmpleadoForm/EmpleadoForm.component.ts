import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, SimpleChanges, signal, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empleado } from '../../interfaces/Empleado.interface';

// Subcomponentes
import { DatosGeneralesComponent } from './datos-generales/datos-generales.component';
import { DatosLaboralesComponent } from './DatosLaborales/DatosLaborales.component';
import { FotoEmpleadoComponent } from './FotoEmpleado/FotoEmpleado.component';
import { CalendarioComponent } from './CalendarioPest/CalendarioPest.component';
import { MetodoRegistroComponent } from './MetodoRegistro/MetodoRegistro.component';
import { ActivacionComponent } from './activacion/activacion.component';
import { PermisosComponent } from './components/Permisos/Permisos.component';
import { HorarioService } from '../../../app/services/Horario.service';


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
/**
 * Clase EmpleadoFormComponent
 */
export class EmpleadoFormComponent implements OnInit, OnChanges {
  @Input() empleado?: Empleado;
  estaEditando = signal<boolean>(false);
  cerrarVentana = output<boolean>();
  guardarEmpleado = output<Empleado>();
  horariosService = inject(HorarioService);

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
      calendarioId: [''],
      dni: [''],
      rol: [''],
      telefono: [''],
      email: [''],
      password: [''],
      fechaNacimiento: [''],
      genero: [''],
      convenio: [''],
      horarioId: [1, [Validators.required]],
      horarioNombre: [''],
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

  /**
 * Método ngOnChanges
 * @param changes: SimpleChanges
 * @returns void 
 */
ngOnChanges(changes: SimpleChanges): void {
    if (changes['empleado'] && !changes['empleado'].firstChange) {
      this.cargarEmpleadoSiAplica();
      console.log('Cambios en empleado:', changes['empleado'].currentValue);
    }
  }

  cargarEmpleadoSiAplica() {
    if (this.empleado) {
      if (!this.empleado.metodos) {
        this.empleado.metodos = {
          appMovil: false,
          appWeb: false,
          telefono: false,
          email: false,
        };
      }

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

      datosEmpleado.id = this.empleado?.id;

      // Extraer foto desde el FormGroup correctamente
      // const fotoRaw = this.formGroup.get('foto')?.value;
      // const fotoBase64 = fotoRaw?.split(',')[1] ?? null;

      // datosEmpleado.foto = fotoBase64;

      // console.log('Foto base64:', fotoBase64);
      // console.log('Datos completos del formulario:', datosEmpleado);
      this.guardarEmpleado.emit(datosEmpleado as Empleado);
      console.log({ 'Guardando empleado...': datosEmpleado });
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
