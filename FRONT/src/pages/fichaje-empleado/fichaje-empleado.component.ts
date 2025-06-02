import { Empleado } from './../../shared/interfaces/Empleado.interface';
import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Fichaje } from '../../shared/interfaces/Fichaje.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-fichaje-empleado',
  imports: [CommonModule],
  templateUrl: './fichaje-empleado.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FichajeEmpleadoComponent {
  estadoActual = signal<'entrada' | 'salida' | 'ninguno'>('ninguno');

  realizarFichaje = output<Fichaje>();


  // marcarEntrada() {
  //   this.estadoActual.set('entrada');
  //   this.emitirFichaje('entrada');
  // }

  // marcarSalida() {
  //   this.estadoActual.set('salida');
  //   this.emitirFichaje('salida');
  // }

  // private emitirFichaje(tipo: 'entrada' | 'salida') {
  //   const ahora = new Date();

  //   const nuevoFichaje: Fichaje = {
  //     id: Date.now(), // o generado por backend
  //     estado: 'Pendiente',
  //     // empleado: this.mockService.empleados[0],
  //     fecha: ahora.toISOString().split('T')[0], // "YYYY-MM-DD"
  //     diaSemana: ahora.toLocaleDateString('es-ES', { weekday: 'long' }), // "miércoles"
  //     horario: tipo === 'entrada' ? '09:00h a 14:00h' : '14:00h a 18:00h', // ejemplo
  //     horasEstimadas: '8,0h',
  //     horasTrabajadas: tipo === 'entrada' ? '0,0h' : '4,0h', // ejemplo
  //     balance: '0,0h',
  //     metodoRegistro: 'Registro manual',
  //     geolocalizacion: true,
  //     geocercas: false,
  //   };

  //   // TODO Hay que hacer el fichaje en el back y que el front lo recupere
  //   this.realizarFichaje.emit(nuevoFichaje);
  // }

}


