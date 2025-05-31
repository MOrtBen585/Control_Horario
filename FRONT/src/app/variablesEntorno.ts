import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root' // Esto hace que sea singleton
})
export class VariablesEntorno {

  public server = 'https://157.180.121.10:8443';
  public localServer = 'http://localhost:8080';
  public api = 'https://www.mortizb.dev/api';
  public apiServer = '/api';
}
