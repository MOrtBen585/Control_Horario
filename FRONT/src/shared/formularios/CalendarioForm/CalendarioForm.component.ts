import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendario } from '../../interfaces/Calendario.interface'; // Asegúrate que el path es correcto
import { CalendarioMesComponent } from '../../../pages/Calendarios-page/components/Calendario-Mes/Calendario-Mes.component';

@Component({
  selector: 'app-calendario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CalendarioMesComponent],
  templateUrl: './calendarioform.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase CalendarioFormComponent
 */
export class CalendarioFormComponent implements OnInit {
  calendario = input<Calendario | null>(null);
  saved = output<Calendario>();
  cancelled = output<void>();
  editable = input<boolean>(true);

  private fb = inject(FormBuilder);

  /**
 * Método nombreMes
 * @param m: number
 * @returns string 
 */
nombreMes(m: number): string {
    return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][m];
  }


  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
  });

  diasSeleccionados = new Set<string>();
  anio = new Date().getFullYear();
  meses = Array.from({ length: 12 }, (_, i) => i);

  /**
 * Método ngOnInit
 * @param 
 * @returns void 
 */
ngOnInit(): void {
    const cal = this.calendario();
    if (cal) {
      this.form.patchValue({ nombre: cal.nombre });
      cal.diasFestivos?.forEach(d => this.diasSeleccionados.add(d));
    }
  }

  /**
 * Método toggleDia
 * @param dia: string
 * @returns void 
 */
toggleDia(dia: string): void {
    if (this.diasSeleccionados.has(dia)) {
      this.diasSeleccionados.delete(dia);
    } else {
      this.diasSeleccionados.add(dia);
    }
  }

  save() {
    if (this.form.valid) {
      const calendario: Calendario = {
        id: this.calendario()?.id ?? undefined,
        nombre: this.form.value.nombre,
        diasFestivos: Array.from(this.diasSeleccionados),
      };

      this.saved.emit(calendario); // ✅ Aquí emitimos todo correctamente
    }
  }


}
