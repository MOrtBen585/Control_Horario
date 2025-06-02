import { Pipe, PipeTransform } from '@angular/core';
import { Empleado } from '../../shared/interfaces/Empleado.interface';

@Pipe({
  name: 'sortBy'
})

export class sortByPipe implements PipeTransform {
  transform(value: Empleado[], sortBy: keyof Empleado | null): Empleado[] {

    switch (sortBy) {
      case 'nombre':
        return value.sort((a, b) => a.nombre.localeCompare(b.nombre));
      case 'telefono':
        return value.sort((a, b) => a.telefono.localeCompare(b.telefono));
      case 'email':
        return value.sort((a, b) => a.email.localeCompare(b.email));
      case 'contratoDesde':
        return value.sort((a, b) => {
          const dateA = a.contratoDesde instanceof Date ? a.contratoDesde : new Date(a.contratoDesde);
          const dateB = b.contratoDesde instanceof Date ? b.contratoDesde : new Date(b.contratoDesde);
          return dateA.getTime() - dateB.getTime();
        });
      case 'horario':
        return value.sort((a, b) => a.horario.localeCompare(b.horario));
      case 'geolocalizable':
        return value.sort((a, b) => (a.geolocalizable ? 1 : 0) - (b.geolocalizable ? 1 : 0));
      case 'geocercas':
        return value.sort((a, b) => (a.geocercas ? 1 : 0) - (b.geocercas ? 1 : 0));
      default:
        return value;
    }

  }
}
