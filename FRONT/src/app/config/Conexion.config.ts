import { inject, Injectable } from "@angular/core";
import { VariablesEntorno } from "../variablesEntorno";

@Injectable({
  providedIn: 'root'
})
/**
 * Clase ConexionConfig
 */
export class ConexionConfig {

  server: string;

  constructor(private variablesGlobales: VariablesEntorno) {
    this.server = this.variablesGlobales.localServer;
  };

}
