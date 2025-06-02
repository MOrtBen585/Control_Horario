import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fichaje } from '../../shared/interfaces/Fichaje.interface';
import { PaginatedResponse } from '../../shared/interfaces/Pagitated-Response.interface';
import { EmpleadoFichajeDto } from '../../shared/interfaces/Empleado-Fichaje-Dto.interface';
import { VariablesEntorno } from '../variablesEntorno';
import { ConexionConfig } from '../config/Conexion.config';



@Injectable({
  providedIn: 'root'
})
export class FichajeService {

  private conexion = inject(ConexionConfig).server;

  private baseUrl = `${this.conexion}/api/fichajes`;

  constructor(private http: HttpClient) { }

  obtenerMisFichajes(params?: any): Observable<PaginatedResponse<Fichaje>> {
    return this.http.get<PaginatedResponse<Fichaje>>(this.baseUrl, { params });
  }

  obtenerMisFichajesPorFecha(fecha: string, params?: any): Observable<PaginatedResponse<Fichaje>> {
    return this.http.get<PaginatedResponse<Fichaje>>(`${this.baseUrl}/${fecha}`, { params });
  }

  obtenerFichajesDeEmpleado(id: number, params?: any): Observable<PaginatedResponse<Fichaje>> {
    return this.http.get<PaginatedResponse<Fichaje>>(`${this.baseUrl}/empleado/${id}`, { params });
  }

  obtenerTodosLosFichajes(params?: any): Observable<PaginatedResponse<Fichaje>> {
    return this.http.get<PaginatedResponse<Fichaje>>(`${this.baseUrl}/all`, { params });
  }

  obtenerTodosLosFichajesActivos(params?: any): Observable<PaginatedResponse<Fichaje>> {
    return this.http.get<PaginatedResponse<Fichaje>>(`${this.baseUrl}/activos`, { params });
  }

  getInfoParaFichar(empleadoId: number): Observable<EmpleadoFichajeDto> {
    return this.http.get<EmpleadoFichajeDto>(`${this.baseUrl}/info/${empleadoId}`);
  }

  registrarFichaje(fichaje: Partial<Fichaje>): Observable<Fichaje> {
    return this.http.post<Fichaje>(`${this.baseUrl}`, fichaje);
  }
}
