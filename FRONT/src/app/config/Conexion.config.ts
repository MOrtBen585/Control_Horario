import { inject, Injectable } from "@angular/core";
import { VariablesEntorno } from "../variablesEntorno";

@Injectable({
  providedIn: 'root'
})
export class ConexionConfig {

  // variablesGlobales = inject(VariablesEntorno);
  server: string;

  constructor(private variablesGlobales: VariablesEntorno) {
    this.server = this.variablesGlobales.localServer;
  };

}
