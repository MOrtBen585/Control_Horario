// src/app/services/Calendario.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calendario } from '../../shared/interfaces/Calendario.interface';
import { Observable } from 'rxjs';
import { ConexionConfig } from '../config/Conexion.config';

@Injectable({
  providedIn: 'root',
})
/**
 * Clase CalendarioService
 */
export class CalendarioService {

  private conexion = inject(ConexionConfig).server;

  private apiUrl = `${this.conexion}/api/calendarios`;
  private readonly http = inject(HttpClient);


  /**
 * Método getAll
 * @param 
 * @returns Observable<Calendario[]> 
 */
getAll(): Observable<Calendario[]> {
    return this.http.get<Calendario[]>(this.apiUrl);
  }

  /**
 * Método getById
 * @param id: number
 * @returns Observable<Calendario> 
 */
getById(id: number): Observable<Calendario> {
    return this.http.get<Calendario>(`${this.apiUrl}/${id}`);
  }

  /**
 * Método create
 * @param calendario: Calendario
 * @returns Observable<Calendario> 
 */
create(calendario: Calendario): Observable<Calendario> {
    return this.http.post<Calendario>(this.apiUrl, calendario);
  }

  /**
 * Método update
 * @param id: number, calendario: Calendario
 * @returns Observable<Calendario> 
 */
update(id: number, calendario: Calendario): Observable<Calendario> {
    return this.http.put<Calendario>(`${this.apiUrl}/${id}`, calendario);
  }

  /**
 * Método delete
 * @param id: number
 * @returns Observable<void> 
 */
delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
