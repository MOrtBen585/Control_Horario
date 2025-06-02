export interface MetodosContacto {
  appMovil: boolean;
  appWeb: boolean;
  telefono: boolean;
  email: boolean;
}

export interface Empleado {
  // Datos personales
  id: number;
  ccc: string;
  foto: string;
  nombre: string;
  apellidos: string;
  calendario: string;
  dni: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  genero: string;

  // Datos laborales
  convenio: string;
  horario: string;
  tipoContrato: string;
  contratoDesde: Date;
  indefinido: boolean;
  centro: string;
  puesto: string;
  politicaVacaciones: string;
  frecuenciaFirma: string;

  // Configuración
  notificaciones: boolean;
  metodoValidacion: string;
  permisosPorDefecto: string;
  rol: string;
  permisosExtra: string;
  bajaIndefinida: boolean;
  activo: boolean;

  // Métodos de registro
  metodos: MetodosContacto;

  // Otros flags
  marcarInicio: boolean;
  geolocalizable: boolean;
  geocercas: boolean;
  permitirCorreccion: boolean;
  permitirHorasExtra: boolean;
}

export interface Equipo {
  id: number;
  nombre: string;
  empleados: Empleado[];
}
