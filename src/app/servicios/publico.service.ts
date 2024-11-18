import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';


@Injectable({
 providedIn: 'root'
})
export class PublicoService {


 private publicoURL = "https://proyectofinalavanzadaa.onrender.com/api/public";


 constructor(private http: HttpClient) { }


 public listarTipos(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/obtener-tipos`);
 }

 filtrarEventos(filtros: any): Observable<MensajeDTO> {
  // Convertimos el objeto filtros a parámetros de consulta
  let params = new HttpParams();
  for (const key in filtros) {
    if (filtros[key]) {
      console.log(`Setting param ${key}: ${filtros[key]}`); // Línea de depuració
      params = params.set(key, filtros[key]);
    }
  }

  return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/filtrar-eventos`, { params });
}


 public listarEventos(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/listar-eventos`);
 }

 public obtenerEvento(nombre: string): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/obtener-evento/${nombre}`);
 }

}
