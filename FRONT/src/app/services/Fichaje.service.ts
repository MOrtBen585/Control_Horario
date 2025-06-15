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
/**
 * Clase FichajeService
 */
export class FichajeService {

  private conexion = inject(ConexionConfig).server;

  private baseUrl = `${this.conexion}/api/fichajes`;

  constructor(private http: HttpClient) { }

  /**
 * Método obtenerMisFichajes
 * @param params?: any
 * @returns Observable<PaginatedResponse<Fichaje>> 
 */
obtenerMisFichajes(params?: any): Observable<PaginatedResponse<Fichaje>> {
    return this.http.get<PaginatedResponse<Fichaje>>(this.baseUrl, { params });
  }

  /**
 * Método obtenerMisFichajesPorFecha
 * @param fecha: string, params?: any
 * @returns Observable<PaginatedResponse<Fichaje>> 
 */
obtenerMisFichajesPorFecha(fecha: string, params?: any): Observable<PaginatedResponse<Fichaje>> {
    return this.http.get<PaginatedResponse<Fichaje>>(`${this.baseUrl}/${fecha}`, { params });
  }

  /**
 * Método obtenerFichajesDeEmpleado
 * @param id: number, params?: any
 * @returns Observable<PaginatedResponse<Fichaje>> 
 */
obtenerFichajesDeEmpleado(id: number, params?: any): Observable<PaginatedResponse<Fichaje>> {
    return this.http.get<PaginatedResponse<Fichaje>>(`${this.baseUrl}/empleado/${id}`, { params });
  }

  /**
 * Método obtenerTodosLosFichajes
 * @param params?: any
 * @returns Observable<PaginatedResponse<Fichaje>> 
 */
obtenerTodosLosFichajes(params?: any): Observable<PaginatedResponse<Fichaje>> {
    return this.http.get<PaginatedResponse<Fichaje>>(`${this.baseUrl}/all`, { params });
  }

  /**
 * Método obtenerTodosLosFichajesActivos
 * @param params?: any
 * @returns Observable<PaginatedResponse<Fichaje>> 
 */
obtenerTodosLosFichajesActivos(params?: any): Observable<PaginatedResponse<Fichaje>> {
    return this.http.get<PaginatedResponse<Fichaje>>(`${this.baseUrl}/activos`, { params });
  }

  /**
 * Método obtenerFichajesActivosSinPaginacion
 * @param 
 * @returns Observable<Fichaje[]> 
 */
obtenerFichajesActivosSinPaginacion(): Observable<Fichaje[]> {
    return this.http.get<Fichaje[]>(`${this.baseUrl}/activos/list`);
  }

  /**
 * Método getInfoParaFichar
 * @param empleadoId: number
 * @returns Observable<EmpleadoFichajeDto> 
 */
getInfoParaFichar(empleadoId: number): Observable<EmpleadoFichajeDto> {
    return this.http.get<EmpleadoFichajeDto>(`${this.baseUrl}/info/${empleadoId}`);
  }

  /**
 * Método registrarFichaje
 * @param fichaje: Partial<Fichaje>
 * @returns Observable<Fichaje> 
 */
registrarFichaje(fichaje: Partial<Fichaje>): Observable<Fichaje> {
    return this.http.post<Fichaje>(`${this.baseUrl}`, fichaje);
  }
}
