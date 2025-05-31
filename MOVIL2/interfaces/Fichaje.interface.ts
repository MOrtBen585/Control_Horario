import { Empleado } from "./Empleado.interface";

export interface Fichaje {
  id: number;
  empleadoId: number;
  estado: string;
  fecha: string;
  empleado: Empleado;
  diaSemana: string;
  horario: string;
  balance: string;
  horasEstimadas: string;
  horasTrabajadas: string;
  metodoRegistro: string;
  geolocalizacion: boolean;
  geocercas: boolean;
  latitud: number,
  longitud: number,
}

