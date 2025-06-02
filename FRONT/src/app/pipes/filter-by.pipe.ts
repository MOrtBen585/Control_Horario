import { Pipe, type PipeTransform } from '@angular/core';
import { Empleado } from '../../shared/interfaces/Empleado.interface';

@Pipe({
  name: 'FilterBy',
})
export class FilterByPipe implements PipeTransform {

  transform(value: Empleado[], searchTerm: string): Empleado[] {
    if (searchTerm.length === 0) {
      return value;
    }
    const term = searchTerm.toLowerCase();

    return value.filter(e => {
      const nombre = e.nombre.toLowerCase();
      const apellidos = e.apellidos.toLowerCase();
      return nombre.includes(term) || apellidos.includes(term);
    });
  }

}
