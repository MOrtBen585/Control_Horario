import { Injectable } from "@angular/core";

@Injectable(
  {
    providedIn: "root"
  }
)
export class VariablesEntorno {
  public server: string = "https://157.180.121.10:8443";
  public localServer: string = "http://localhost:8080";
  public api: string = "https://www.mortizb.dev/api";
}
