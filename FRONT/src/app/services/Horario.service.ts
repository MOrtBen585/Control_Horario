// src/app/services/horario.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HorarioResponseDto, HorarioRequestDto } from '../../shared/interfaces/Hoarario.interface';
import { ConexionConfig } from '../config/Conexion.config';



@Injectable({ providedIn: 'root' })
export class HorarioService {
  private conexion = inject(ConexionConfig).server;

  private baseUrl = `${this.conexion}/api/horarios`;

  constructor(private http: HttpClient) { }

  /** Obtener todos los horarios */
  getAll(): Observable<HorarioResponseDto[]> {
    console.log('Obteniendo todos los horarios');
    return this.http.get<HorarioResponseDto[]>(this.baseUrl);
  }

  /** Obtener un horario por ID */
  getById(id: number): Observable<HorarioResponseDto> {
    return this.http.get<HorarioResponseDto>(`${this.baseUrl}/${id}`);
  }

  /** Crear un nuevo horario */
  create(dto: HorarioRequestDto): Observable<HorarioResponseDto> {
    return this.http.post<HorarioResponseDto>(this.baseUrl, dto);
  }

  /** Actualizar un horario existente */
  update(id: number, dto: HorarioRequestDto): Observable<HorarioResponseDto> {
    return this.http.put<HorarioResponseDto>(`${this.baseUrl}/${id}`, dto);
  }

  /** Eliminar un horario */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
