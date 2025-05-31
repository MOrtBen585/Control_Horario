import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of, tap, timeout } from 'rxjs';
import { Empleado } from '../../shared/interfaces/Empleado.interface';
import { PaginatedResponse } from '../../shared/interfaces/PagitatedResponse.interface';
import { VariablesEntorno } from '../variablesEntorno';
import { ConexionConfig } from '../config/Conexion.config';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


  private server = inject(ConexionConfig).server;

  private apiUrl = `${this.server}/api/empleados`; // Ajusta el puerto si es necesario
  empleadosCache = new Map<string, PaginatedResponse<Empleado>>();


  constructor(private http: HttpClient) { }

  // 🔹 Obtener todos los empleados (sin paginación)
  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  // 🔹 Obtener empleados paginados
  getPaged(params?: any): Observable<PaginatedResponse<Empleado>> {
    const key = JSON.stringify(params ?? {});

    if (this.empleadosCache.has(key)) {
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
  getById(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Crear un nuevo empleado
  create(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado);
  }

  // 🔹 Actualizar empleado
  update(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado);
  }

  // 🔹 Eliminar empleado
  delete(id: number): Observable<void> {
    console.log("Eliminando en el servicio empleado...")
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
