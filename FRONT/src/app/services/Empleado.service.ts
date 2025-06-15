import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of, tap, timeout } from 'rxjs';
import { Empleado } from '../../shared/interfaces/Empleado.interface';
import { PaginatedResponse } from '../../shared/interfaces/Pagitated-Response.interface';
import { VariablesEntorno } from '../variablesEntorno';
import { ConexionConfig } from '../config/Conexion.config';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase EmpleadoService
 */
export class EmpleadoService {


  private conexion = inject(ConexionConfig).server;

  private apiUrl = `${this.conexion}/api/empleados`; // Ajusta el puerto si es necesario
  empleadosCache = new Map<string, PaginatedResponse<Empleado>>();


  private http = inject(HttpClient);

  // 🔹 Obtener todos los empleados (sin paginación)
  /**
 * Método getAll
 * @param 
 * @returns Observable<Empleado[]> 
 */
getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  // 🔹 Obtener empleados paginados
  /**
 * Método getPaged
 * @param params?: any
 * @returns Observable<PaginatedResponse<Empleado>> 
 */
getPaged(params?: any): Observable<PaginatedResponse<Empleado>> {
    const key = JSON.stringify(params ?? {});

    if (this.empleadosCache.has(key) &&
      this.empleadosCache.get(key)!.ultimaActualizacion.getMinutes() > new Date().getMinutes() - 1) {
      console.log('Empleados de la cache:', this.empleadosCache.get(key));
      return of(this.empleadosCache.get(key)!)
        .pipe(
          tap(() => console.log('Post-delay (cache)')),
          delay(2000)
        );
    }

    return this.http
      .get<PaginatedResponse<Empleado>>(`${this.apiUrl}/paged`, { params })
      .pipe(
        tap((resp) => {
          console.log('Empleados de la petición:', resp);
          // Se guarda la fecha de la ultima actualización
          resp.ultimaActualizacion = new Date();
          this.empleadosCache.set(key, resp);
        }),
        delay(2000)
      )
  }

  // TODO Mientras no se implementan las operaciones de modificación de empleados, borramos el cache
  borrarCache() {
    this.empleadosCache.clear();
  }

  // 🔹 Obtener un empleado por ID
  /**
 * Método getById
 * @param id: number
 * @returns Observable<Empleado> 
 */
getById(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Crear un nuevo empleado
  /**
 * Método create
 * @param empleado: Empleado
 * @returns Observable<Empleado> 
 */
create(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado);
  }

  // 🔹 Actualizar empleado
  /**
 * Método update
 * @param id: number, empleado: Empleado
 * @returns Observable<Empleado> 
 */
update(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado);
  }

  // 🔹 Eliminar empleado
  /**
 * Método delete
 * @param id: number
 * @returns Observable<void> 
 */
delete(id: number): Observable<void> {
    console.log("Eliminando en el servicio empleado...")
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
