import { Component, ChangeDetectionStrategy, signal, computed, EventEmitter, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendario-mes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario-mes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarioMesComponent {
  // Inputs
  mes = input<number>();
  anio = input<number>();
  editable = input<boolean>(true);
  seleccionados = input<Set<string>>(new Set());

  // Output
  toggle = output<string>();

  // Días generados en base al mes/año
  dias = computed(() => {
    const result: Date[] = [];
    const mesValue = this.mes();
    const anioValue = this.anio();
    if (mesValue == null || anioValue == null) return result;

    const date = new Date(anioValue, mesValue, 1);
    while (date.getMonth() === mesValue) {
      result.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return result;
  });

  formatearFecha(d: Date): string {
    return d.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  }

  isSeleccionado(d: Date): boolean {
    return this.seleccionados()?.has(this.formatearFecha(d));
  }

  toggleDia(d: Date) {
    if (this.editable()) {
      this.toggle.emit(this.formatearFecha(d));
    }
  }

}
