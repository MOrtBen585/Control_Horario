import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empleado, Equipo } from '../../shared/interfaces/Empleado.interface';
import { EmpleadoFilterComponent } from "../empleados/empleados.page/components/empleado.filter/empleado.filter.component";
import { EquipoService } from '../../app/services/Equipos.service';
import { EmpleadoService } from '../../app/services/Empleado.service';

@Component({
  selector: 'app-equipos-page',
  imports: [ReactiveFormsModule, CommonModule, EmpleadoFilterComponent, FormsModule],
  templateUrl: './Equipos-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase EquiposPageComponent
 */
export class EquiposPageComponent {

  equiposFiltrados = signal<Equipo[]>([]);
  mostrarModal = false;
  equipoS = inject(EquipoService);
  empleadoS = inject(EmpleadoService);
  empleados = signal<Empleado[]>([]);
  equipos = signal<Equipo[]>([]);
  equipoExpandidoId: number | null = null;
  fb = inject(FormBuilder);
  formNuevoEquipo: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    empleados: [[]],
  });
  empleadoSeleccionado: Record<number, number | null> = {};
  guardarCambios = signal(false);


  toggleExpand(id: number) {
    this.equipoExpandidoId = this.equipoExpandidoId === id ? null : id;
  }

  save() {
    console.log('Guardando cambios...');
    this.guardarCambios.set(false);
  }

  constructor() {
    this.equipoS.getAll().subscribe(res => {
      this.equipos.set(res);
      this.equiposFiltrados.set(res);
    });
    console.log("equipos", this.equipos())
    this.empleadoS.getAll().subscribe(res => {
      this.empleados.set(res);
    });
    console.log("empleados", this.empleados());
  }

  cerrarModal() {
    this.mostrarModal = false;
  }


  toggleFormulario() {
    this.mostrarModal = !this.mostrarModal;
    if (!this.mostrarModal) this.formNuevoEquipo.reset();
  }

  toggleEmpleado(id: number) {
    const seleccionados: number[] = this.formNuevoEquipo.value.empleados || [];

    const actualizados = seleccionados.includes(id)
      ? seleccionados.filter(e => e !== id)
      : [...seleccionados, id];

    this.formNuevoEquipo.patchValue({ empleados: actualizados });
  }

  addEmpleado(equipoId: number, empleadoId: number | null) {
    console.log('addEmpleado - Equipo:', equipoId, 'Empleado ID:', empleadoId);

    // Verifica que el empleadoId no sea nulo ni indefinido
    if (empleadoId === null || empleadoId === undefined) {
      console.log('No se seleccionó un empleado.');
      return;
    }

    // Verifica si los empleados están correctamente cargados
    // console.log('Empleados disponibles:', this.empleados);

    // Buscar el empleado por su ID
    const emp = this.empleados().find(e => e.id === Number(empleadoId));
    console.log('Empleado encontrado:', emp);
    if (!emp) {
      console.log('Empleado no encontrado en la lista.');
      return;
    }


    const equiposActualizados = this.equipos().map(equipo => {
      if (equipo.id === equipoId) {
        const yaEsta = equipo.empleados.some(e => e.id === emp.id);
        if (yaEsta) {
          console.log('El empleado ya está en este equipo.');
          return equipo; // No hacer nada si el empleado ya está en el equipo
        }

        // Agregar el empleado si no está en el equipo
        return {
          ...equipo,
          empleados: [...equipo.empleados, emp],
        };
      }
      return equipo;
    });

    // Actualizar los equipos
    this.equipos.set(equiposActualizados);
    this.equiposFiltrados.set(equiposActualizados);

    // Limpiar el selector de empleados
    this.empleadoSeleccionado[equipoId] = null;
    console.log('Empleado añadido correctamente al equipo');

    this.guardarCambios.set(true);
  }




  /**
 * Método empleadosSinEquipo
 * @param equipo: Equipo
 * @returns Empleado[]
 */
  empleadosSinEquipo(equipo: Equipo): Empleado[] {
    return this.empleados().filter(emp =>
      !equipo.empleados.some(e => e.id === emp.id)
    );
  }

  removeEmpleado(equipoId: number, empleadoId: number) {
    const equiposActualizados = this.equipos().map(equipo => {
      if (equipo.id === equipoId) {
        return {
          ...equipo,
          empleados: equipo.empleados.filter(e => e.id !== empleadoId),
        };
      }
      return equipo;
    });

    this.equipos.set(equiposActualizados);
    this.equiposFiltrados.set(equiposActualizados);
    this.guardarCambios.set(true);
  }



  crearEquipo() {
    if (this.formNuevoEquipo.valid) {
      const { nombre, empleados: empleadosIds } = this.formNuevoEquipo.value;

      const empleadosSeleccionados = this.empleados().filter(emp =>
        empleadosIds.includes(emp.id) // ✅ comparación por ID
      );

      const nuevo: Equipo = {
        id: Date.now(),
        nombre,
        empleados: empleadosSeleccionados,
      };

      this.equipos.set([...this.equipos(), nuevo]);
      this.equiposFiltrados.set(this.equipos());

      this.formNuevoEquipo.reset();
      this.toggleFormulario();
      this.guardarCambios.set(true);
    }

  }


  onSearch(searchTerm: string) {
    const term = this.normalizarTexto(searchTerm);

    console.log('Buscando:', term);

    this.equiposFiltrados.set(
      this.equipos().filter(e => {
        const nombre = this.normalizarTexto(e.nombre);
        return nombre.includes(term);
      })
    );
  }

  /**
* Método normalizarTexto
* @param texto: string
* @returns string
*/
  private normalizarTexto(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')              // Descompone los caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos
      .trim();
  }
}
