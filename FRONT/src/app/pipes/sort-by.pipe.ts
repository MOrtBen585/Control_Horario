import { PipeTransform, Pipe } from '@angular/core';
import { Empleado } from '../../shared/interfaces/Empleado.interface';
// Ajusta esta ruta a la de tu interfaz Empleado

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(value: Empleado[], sortBy: keyof Empleado | null): Empleado[] {
    // Si no hay valor, el array está vacío o no hay clave de ordenación, devuelve el array original
    if (!value || value.length === 0 || !sortBy) {
      return value;
    }

    // Crea una copia superficial para evitar modificar el array original
    const sortedValue = [...value];

    return sortedValue.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      // Maneja valores nulos/indefinidos: los coloca al final de la lista ordenada
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      switch (sortBy) {
        case 'nombre':
        case 'telefono':
        case 'email':
          // Usa localeCompare para comparaciones de cadenas
          return (aValue as string).localeCompare(bValue as string);

        case 'contratoDesde':
          // Convierte a objetos Date para una comparación precisa
          const dateA = aValue instanceof Date ? aValue : new Date(aValue as string);
          const dateB = bValue instanceof Date ? bValue : new Date(bValue as string);
          return dateA.getTime() - dateB.getTime();

        case 'horarioId':
          // Comparación numérica para números
          return (aValue as number) - (bValue as number);

        case 'geolocalizable':
        case 'geocercas':
          // Comparación booleana: false va antes que true
          return (aValue === bValue) ? 0 : (aValue ? 1 : -1);

        default:
          // Comportamiento por defecto para otros tipos o si sortBy no coincide con un caso específico
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return aValue - bValue;
          }
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue);
          }
          return 0; // Si no se puede comparar de otra forma, considera que son iguales
      }
    });
  }
}
