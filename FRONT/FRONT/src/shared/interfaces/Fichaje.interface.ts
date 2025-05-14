import { Empleado } from "./Empleado.interface";

export interface Fichaje {
  id: number;
  estado: 'Validada' | 'Corregida y validada' | 'Pendiente' | string;
  empleado: Empleado;
  fecha: string; // Ej: "2025-01-22"
  diaSemana: string; // Ej: "miércoles"
  horario: string; // Ej: "09:00h a 14:00h"
  horasEstimadas: string; // Ej: "8,0h"
  horasTrabajadas: string; // Ej: "8,0h"
  balance: string; // Ej: "0,0h", "-1,33h"
  metodoRegistro: string; // Ej: "Validación de la jornada"
  geolocalizacion: boolean;
  geocercas: boolean;
}
