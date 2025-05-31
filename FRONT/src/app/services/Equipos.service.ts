
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../../shared/interfaces/Empleado.interface';
import { VariablesEntorno } from '../variablesEntorno';
import { ConexionConfig } from '../config/Conexion.config';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private server = inject(ConexionConfig).server;

  private baseUrl = `${this.server}/api/equipos`;
  http = inject(HttpClient);

  getAll(): Observable<Equipo[]> {
    console.log("getAll")
    return this.http.get<Equipo[]>(this.baseUrl);
  }

  getById(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.baseUrl}/${id}`);
  }

  create(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.baseUrl, equipo);
  }

  update(id: number, equipo: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.baseUrl}/${id}`, equipo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
