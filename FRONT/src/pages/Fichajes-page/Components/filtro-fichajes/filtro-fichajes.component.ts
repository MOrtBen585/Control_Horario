import { ChangeDetectionStrategy, Component, inject, input, NgModule, output } from '@angular/core';
import { Fichaje } from '../../../../shared/interfaces/Fichaje.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FichajeService } from '../../../../app/services/Fichaje.service';
import { rxResource } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-filtro-fichajes',
  imports: [CommonModule, FormsModule],
  templateUrl: './filtro-fichajes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltroFichajesComponent {


  filtrar = output<Fichaje[]>();
  private debounceTimeout: any;
  fichajeS = inject(FichajeService);

  searchNombre = '';
  mesSeleccionado = '';
  anioSeleccionado = '';

  meses = [
    { nombre: 'Enero', valor: '01' },
    { nombre: 'Febrero', valor: '02' },
    { nombre: 'Marzo', valor: '03' },
    { nombre: 'Abril', valor: '04' },
    { nombre: 'Mayo', valor: '05' },
    { nombre: 'Junio', valor: '06' },
    { nombre: 'Julio', valor: '07' },
    { nombre: 'Agosto', valor: '08' },
    { nombre: 'Septiembre', valor: '09' },
    { nombre: 'Octubre', valor: '10' },
    { nombre: 'Noviembre', valor: '11' },
    { nombre: 'Diciembre', valor: '12' },
  ];

  fichajesOriginales = rxResource({
    loader: () => this.fichajeS.obtenerFichajesActivosSinPaginacion(),
  });

  get anios(): string[] {
    const fichajes = this.fichajesOriginales.value();
    if (!fichajes) return [];

    return [...new Set(fichajes.map(f => f.fecha.substring(0, 4)))];
  }


  aplicarFiltro() {
    const filtrados = this.fichajesOriginales.value()!.filter(f => {
      const nombreCompleto = `${f.empleado.nombre ?? ''} ${f.empleado.apellidos ?? ''}`;
      const coincideNombre = this.normalizarTexto(nombreCompleto).includes(this.searchNombre.toLowerCase());
      const coincideMes = this.mesSeleccionado ? f.fecha.substring(5, 7) === this.mesSeleccionado : true;
      const coincideAnio = this.anioSeleccionado ? f.fecha.substring(0, 4) === this.anioSeleccionado : true;
      return coincideNombre && coincideMes && coincideAnio;
    });

    if (filtrados.length === 0) {
      this.filtrar.emit([]);
    } else {
      this.filtrar.emit(filtrados);
    }

  }

  limpiarFiltro() {
    this.searchNombre = '';
    this.mesSeleccionado = '';
    this.anioSeleccionado = '';
    this.filtrar.emit([]);
  }

  actualizarFiltro(filtrados: Fichaje[]) {
    this.filtrar.emit(filtrados);
  }

  onInputChange() {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.aplicarFiltro();
    }, 1000); // 1000 ms = 1 segundo
  }

  private normalizarTexto(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')              // Descompone los caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos
      .trim();
  }
}
