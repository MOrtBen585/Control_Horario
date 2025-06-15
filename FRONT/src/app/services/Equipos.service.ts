
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../../shared/interfaces/Empleado.interface';
import { VariablesEntorno } from '../variablesEntorno';
import { ConexionConfig } from '../config/Conexion.config';


@Injectable({
  providedIn: 'root'
})
/**
 * Clase EquipoService
 */
export class EquipoService {

  private server = inject(ConexionConfig).server;

  private baseUrl = `${this.server}/api/equipos`;
  http = inject(HttpClient);

  /**
 * Método getAll
 * @param 
 * @returns Observable<Equipo[]> 
 */
getAll(): Observable<Equipo[]> {
    console.log("getAll")
    return this.http.get<Equipo[]>(this.baseUrl);
  }

  /**
 * Método getById
 * @param id: number
 * @returns Observable<Equipo> 
 */
getById(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.baseUrl}/${id}`);
  }

  /**
 * Método create
 * @param equipo: Equipo
 * @returns Observable<Equipo> 
 */
create(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.baseUrl, equipo);
  }

  /**
 * Método update
 * @param id: number, equipo: Equipo
 * @returns Observable<Equipo> 
 */
update(id: number, equipo: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.baseUrl}/${id}`, equipo);
  }

  /**
 * Método delete
 * @param id: number
 * @returns Observable<void> 
 */
delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
