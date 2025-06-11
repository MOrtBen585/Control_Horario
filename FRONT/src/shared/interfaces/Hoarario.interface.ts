export interface Horario {
  id?: number;
  nombre: string;
  predeterminado: boolean;
  dias: boolean[];
  meses: boolean[];
  rotacion: 'none' | 'weekly' | 'daily';
  horario: string;
}


export interface HorarioRequestDto {
  nombre: string;
  predeterminado: boolean;
  dias: boolean[];
  meses: boolean[];
  rotacion: 'none' | 'weekly' | 'daily';
  horario: string;
}


export interface HorarioResponseDto {
  id: number;
  nombre: string;
  predeterminado: boolean;
  dias: boolean[];
  meses: boolean[];
  rotacion: 'none' | 'weekly' | 'daily';
  horario: string;
}
