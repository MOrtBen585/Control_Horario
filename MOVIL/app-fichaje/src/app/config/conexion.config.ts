import { inject, Injectable } from "@angular/core";
import { VariablesEntorno } from "../variablesEntorno";

@Injectable(
  {
    providedIn: "root"
  }
)
export class ConexionConfig {
  private variablesEntorno = inject(VariablesEntorno);

  // Configuracion de la conexion usando las variables de entorno.
  // Para cambiar la conexion, usar las variables de entorno server y localServer
  public server: string = this.variablesEntorno.api;

}
