import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fichaje } from '../../shared/interfaces/Fichaje.interface';
import { Empleado } from '../../shared/interfaces/Empleado.interface';

@Component({
  selector: 'app-fichaje-empleado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fichaje-empleado.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FichajeEmpleadoComponent {
  empleado = input.required<Empleado>();
  realizarFichaje = output<Fichaje>();

  estadoActual = signal<'entrada' | 'salida' | 'ninguno'>('ninguno');

  marcarEntrada() {
    this.estadoActual.set('entrada');
    this.emitirFichaje('entrada');
  }

  marcarSalida() {
    this.estadoActual.set('salida');
    this.emitirFichaje('salida');
  }

  get esDiaLaboral(): boolean {
    const diaIndex = new Date().getDay(); // 0 (domingo) - 6 (sábado)
    return this.empleado().horario?.dias?.[diaIndex] ?? false;
  }


  private emitirFichaje(tipo: 'entrada' | 'salida') {
    const ahora = new Date();

    // 0: Domingo, 1: Lunes, ..., 6: Sábado
    const diaSemanaIndex = ahora.getDay();
    const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const diaSemana = diasSemana[diaSemanaIndex];

    const horarioObj = this.empleado().horario;
    const activoHoy = horarioObj?.dias?.[diaSemanaIndex];

    if (!activoHoy) {
      console.warn(`No hay horario activo para ${diaSemana}`);
      return;
    }

    const horarioDelDia = horarioObj?.horario ?? '';
    const [horaEntrada, horaSalida] = horarioDelDia.split('-');

    if (!horaEntrada || !horaSalida) {
      console.warn(`Horario mal definido: ${horarioDelDia}`);
      return;
    }

    const [h1, m1] = horaEntrada.split(':').map(Number);
    const [h2, m2] = horaSalida.split(':').map(Number);
    const minutos = (h2 * 60 + m2) - (h1 * 60 + m1);
    const horasEstimadas = (minutos / 60).toFixed(1) + 'h';

    const nuevoFichaje: Fichaje = {
      id: Date.now(),
      empleadoId: this.empleado().id,
      empleado: this.empleado(),
      estado: 'Pendiente',
      fecha: ahora.toISOString().split('T')[0],
      diaSemana,
      horario: horarioDelDia,
      hora: tipo === 'entrada' ? horaEntrada : horaSalida,
      horasEstimadas,
      horasTrabajadas: '0,0h',
      balance: '0,0h',
      metodoRegistro: 'Registro manual',
      geolocalizacion: true,
      geocercas: false,
      latitud: 0,
      longitud: 0
    };

    this.realizarFichaje.emit(nuevoFichaje);
  }
}
