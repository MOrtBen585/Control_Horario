import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Empleado } from '../../../../shared/interfaces/Empleado.interface';


@Component({
  selector: 'tabla-vacaciones',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './tabla-vacaciones.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaVacacionesComponent {
  empleados = input<Empleado[]>([]);
  filterBy = input<string>('');
  modoVista = input<'dia' | 'mes' | 'anio'>('mes');
  fechaReferencia = input<Date>(new Date());

  diasDelMes = computed(() => {
    const date = this.fechaReferencia();
    const year = date.getFullYear();
    const month = date.getMonth();
    const dias: Date[] = [];

    const totalDias = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= totalDias; i++) {
      dias.push(new Date(year, month, i));
    }
    return dias;
  });

  tieneVacaciones(empleado: Empleado, dia: Date): boolean {
    // Ajustar este método según el formato real del array de vacaciones del empleado
    const fechaStr = dia.toISOString().split('T')[0];
    return (empleado as any).vacaciones?.includes(fechaStr); // Suponemos vacaciones: string[] con formato YYYY-MM-DD
  }
}
