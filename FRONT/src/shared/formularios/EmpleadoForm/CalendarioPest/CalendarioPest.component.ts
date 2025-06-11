import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, Input, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { FotoUploaderComponent } from '../FotoUploader/FotoUploader.component';
import { CalendarioService } from '../../../../app/services/Calendario.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CalendarioFormComponent } from '../../CalendarioForm/CalendarioForm.component';
import { Calendario } from '../../../interfaces/Calendario.interface';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FotoUploaderComponent, CalendarioFormComponent],
  templateUrl: './calendariopest.component.html',
})
export class CalendarioComponent {
  formGroup = input.required<FormGroup>();
  calendarioService = inject(CalendarioService);
  calendario = signal<Calendario | null>(null);

  calendarios = rxResource({
    loader: () => this.calendarioService.getAll()
  });

  get calendarioCtrl(): FormControl {
    return this.formGroup()!.get('calendarioId') as FormControl;
  }

  verCalendario() {
    const id = this.calendarioCtrl.value;
    const calendarioCompleto = this.calendarios.value()?.find(c => c.id === id) ?? null;
    this.calendario.set(calendarioCompleto);
  }

  cerrarModal() {
    this.calendario.set(null);
  }

}
