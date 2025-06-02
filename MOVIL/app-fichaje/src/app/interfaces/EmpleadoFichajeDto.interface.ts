// src/shared/interfaces/EmpleadoFichajeDto.interface.ts
export interface EmpleadoFichajeDto {
  empleadoId: number;
  nombre: string;
  apellidos: string;
  puesto: string;
  horario: string;
  geolocalizable: boolean;
  marcarInicio: boolean;
  permitirCorreccion: boolean;
  estadoSiguiente: 'ENTRADA' | 'SALIDA';
  ultimaEntrada?: string;
  ultimaSalida?: string;
}
