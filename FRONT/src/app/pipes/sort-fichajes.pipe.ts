import { Pipe, PipeTransform } from '@angular/core';
import { Fichaje } from '../../shared/interfaces/Fichaje.interface';

@Pipe({
  name: 'sortFichajes'
})
/**
 * Clase SortFichajesPipe
 */
export class SortFichajesPipe implements PipeTransform {
  /**
 * Método transform
 * @param value: Fichaje[], sortBy: string | null, direction: 'asc' | 'desc' = 'asc'
 * @returns Fichaje[] 
 */
transform(value: Fichaje[], sortBy: string | null, direction: 'asc' | 'desc' = 'asc'): Fichaje[] {
    if (!value || !sortBy) return value;

    const sorted = [...value];

    const getValue = (obj: any, path: string): any =>
      path.split('.').reduce((acc, part) => acc?.[part], obj);

    sorted.sort((a, b) => {
      const aVal = getValue(a, sortBy);
      const bVal = getValue(b, sortBy);

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      let result = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        result = aVal.localeCompare(bVal);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        result = aVal - bVal;
      } else if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
        result = aVal === bVal ? 0 : aVal ? 1 : -1;
      } else if (!isNaN(Date.parse(aVal)) && !isNaN(Date.parse(bVal))) {
        result = new Date(aVal).getTime() - new Date(bVal).getTime();
      }

      return direction === 'asc' ? result : -result;
    });

    return sorted;
  }
}
