// src/app/services/Calendario.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calendario } from '../../shared/interfaces/Calendario.interface';
import { Observable } from 'rxjs';
import { ConexionConfig } from '../config/Conexion.config';

@Injectable({
  providedIn: 'root',
})
export class CalendarioService {

  private conexion = inject(ConexionConfig).server;

  private apiUrl = `${this.conexion}/api/calendarios`;
  private readonly http = inject(HttpClient);


  getAll(): Observable<Calendario[]> {
    return this.http.get<Calendario[]>(this.apiUrl);
  }

  getById(id: number): Observable<Calendario> {
    return this.http.get<Calendario>(`${this.apiUrl}/${id}`);
  }

  create(calendario: Calendario): Observable<Calendario> {
    return this.http.post<Calendario>(this.apiUrl, calendario);
  }

  update(id: number, calendario: Calendario): Observable<Calendario> {
    return this.http.put<Calendario>(`${this.apiUrl}/${id}`, calendario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
