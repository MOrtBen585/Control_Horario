import { Calendario } from './../../shared/interfaces/Calendario.interface';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { CalendarioFormComponent } from '../../shared/formularios/CalendarioForm/CalendarioForm.component';
import { CalendarioService } from '../../app/services/Calendario.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-calendarios-page',
  standalone: true,
  imports: [CommonModule, CalendarioFormComponent],
  templateUrl: './calendarios-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendariosPageComponent {
  private calendarioService = inject(CalendarioService);

  calendarios = rxResource({
    loader: () => this.calendarioService.getAll().pipe(
      tap(c => console.log('Calendarios obtenidos:', c))
    )
  });

  editingCalendario = signal<Calendario | null>(null);

  openModal(calendario?: Calendario) {
    this.editingCalendario.set(calendario ?? { nombre: '', diasFestivos: [] });
  }

  closeModal() {
    this.editingCalendario.set(null);
  }

  guardar(calendario: Calendario) {
    const save$ = calendario.id != null
      ? this.calendarioService.update(calendario.id, calendario)
      : this.calendarioService.create(calendario);

    save$.subscribe({
      next: () => {
        this.calendarios.reload();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al guardar calendario:', err);
      }
    });
  }

}
