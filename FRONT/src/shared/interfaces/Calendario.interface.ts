// src/shared/interfaces/Calendario.interface.ts
export interface Calendario {
  id?: number;
  nombre: string;
  diasFestivos: string[]; // Fechas en formato ISO: 'YYYY-MM-DD'
}
