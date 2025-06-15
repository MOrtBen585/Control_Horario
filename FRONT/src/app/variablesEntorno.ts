import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase VariablesEntorno
 */
export class VariablesEntorno {

  // Variables privadas y constantes
  private readonly _server = 'https://157.180.121.10:8443';
  private readonly _localServer = 'http://localhost:8080';
  private readonly _api = 'https://www.mortizb.dev/api';
  private readonly _apiServer = '/api';

  // Getters públicos
  get /**
 * Método server
 * @param 
 * @returns string 
 */
server(): string {
    return this._server;
  }

  get /**
 * Método localServer
 * @param 
 * @returns string 
 */
localServer(): string {
    return this._localServer;
  }

  get /**
 * Método api
 * @param 
 * @returns string 
 */
api(): string {
    return this._api;
  }

  get /**
 * Método apiServer
 * @param 
 * @returns string 
 */
apiServer(): string {
    return this._apiServer;
  }
}
