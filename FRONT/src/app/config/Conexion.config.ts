import { inject, Injectable } from "@angular/core";
import { VariablesEntorno } from "../variablesEntorno";

@Injectable({
  providedIn: 'root'
})
export class ConexionConfig {
  variablesGlobales = inject(VariablesEntorno);

  public server = this.variablesGlobales.localServer;
}
