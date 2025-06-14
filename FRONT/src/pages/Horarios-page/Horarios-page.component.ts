import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from '../../app/services/Empleado.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Horario, HorarioResponseDto } from '../../shared/interfaces/Hoarario.interface';
import { HorarioFormComponent } from '../../shared/formularios/Horarios-Form/Horarios-Form.component';
import { HorarioService } from '../../app/services/Horario.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-horarios-page',
  standalone: true,
  imports: [CommonModule, HorarioFormComponent],
  templateUrl: './horarios-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorariosPageComponent {
  horarioService = inject(HorarioService);
  horarios = rxResource({
    loader: () => this.horarioService.getAll().pipe(
      tap(h => console.log('Horarios obtenidos:', h))
    )
  });
  editingHorario = signal<Horario | null>(null);

  openModal(horario?: Horario) {
    this.editingHorario.set(horario ?? null);
  }

  closeModal() {
    this.editingHorario.set(null);
  }

  guardar() {
    this.horarios.reload();
    this.closeModal();
  }
}
