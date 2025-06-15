import { Component, ChangeDetectionStrategy, input, output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Horario } from '../../interfaces/Hoarario.interface';

@Component({
  selector: 'app-horario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './horarios-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase HorarioFormComponent
 */
export class HorarioFormComponent implements OnInit {
  horario = input<Horario | null>(null);
  saved = output<void>();
  private fb = inject(FormBuilder);

  // Helper para inicializar días y meses como array de FormControl<boolean>
  /**
* Método buildBoolArray
* @param size: number, values: boolean[] = []
* @returns FormArray<FormControl<boolean>>
*/
  private buildBoolArray(size: number, values: boolean[] = []): FormArray<FormControl<boolean>> {
    return this.fb.array(
      Array.from({ length: size }, (_, i) => this.fb.control(values[i] ?? false, { nonNullable: true }))
    ) as FormArray<FormControl<boolean>>;
  }


  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    predeterminado: [false],
    dias: this.buildBoolArray(7),
    meses: this.buildBoolArray(12),
    rotacion: ['none'],
    horario: ['', Validators.required],
    bloques: this.fb.array([]), // 👈 Añadido
  });

  // Getter para acceder a bloques desde el HTML
  get /**
 * Método bloques
 * @param
 * @returns FormArray
 */
    bloques(): FormArray {
    return this.form.get('bloques') as FormArray;
  }

  /**
 * Método getBloque
 * @param index: number
 * @returns FormGroup
 */
  getBloque(index: number): FormGroup {
    return this.bloques.at(index) as FormGroup;
  }


  // Método para añadir un bloque
  /**
 * Método addBloque
 * @param
 * @returns void
 */
  addBloque(): void {
    const bloque = this.fb.group({
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
    });
    this.bloques.push(bloque);
  }

  // Método para eliminar un bloque por índice
  /**
 * Método removeBloque
 * @param index: number
 * @returns void
 */
  removeBloque(index: number): void {
    this.bloques.removeAt(index);
  }


  // Helpers para acceso tipado
  get /**
 * Método diasArray
 * @param
 * @returns FormArray<FormControl<boolean>>
 */
    diasArray(): FormArray<FormControl<boolean>> {
    return this.form.get('dias') as FormArray<FormControl<boolean>>;
  }
  get /**
 * Método mesesArray
 * @param
 * @returns FormArray<FormControl<boolean>>
 */
    mesesArray(): FormArray<FormControl<boolean>> {
    return this.form.get('meses') as FormArray<FormControl<boolean>>;
  }

  /**
 * Método getDiaControl
 * @param i: number
 * @returns FormControl<boolean>
 */
  getDiaControl(i: number): FormControl<boolean> {
    return this.diasArray.at(i) as FormControl<boolean>;
  }
  /**
 * Método getMesControl
 * @param i: number
 * @returns FormControl<boolean>
 */
  getMesControl(i: number): FormControl<boolean> {
    return this.mesesArray.at(i) as FormControl<boolean>;
  }

  /**
 * Método ngOnInit
 * @param
 * @returns void
 */
  ngOnInit(): void {
    const h = this.horario();
    if (h) {
      this.form.patchValue({
        nombre: h.nombre,
        predeterminado: h.predeterminado,
        rotacion: h.rotacion,
        horario: h.horario,
      });
      // Set valores para FormArray (días y meses)
      h.dias.forEach((v, i) => this.getDiaControl(i).setValue(v));
      h.meses.forEach((v, i) => this.getMesControl(i).setValue(v));
    }
  }

  /**
 * Método save
 * @param
 * @returns void
 */
  save(): void {
    if (this.form.valid) {
      // TODO: Llama a tu servicio aquí
      this.saved.emit();
    }
  }
}
