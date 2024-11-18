import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { CrearEventoDTO } from '../dto/crear-evento-dto';
import { EditarEventoDTO } from '../dto/editar-evento-dto';
import { Observable } from 'rxjs';


@Injectable({
 providedIn: 'root'
})
export class AdministradorService {


 private adminURL = "https://proyectofinalavanzadaa.onrender.com/api/admin";

 private imgURL = "https://proyectofinalavanzadaa.onrender.com/api/imagenes"


 constructor(private http: HttpClient) { }

 public crearEvento(crearEventoDTO: CrearEventoDTO): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.adminURL}/crear-evento`, crearEventoDTO);
 }


 public actualizarEvento(editarEventoDTO: EditarEventoDTO): Observable<MensajeDTO> {
   return this.http.put<MensajeDTO>(`${this.adminURL}/editar-evento`, editarEventoDTO);
 }


 //public obtenerEvento(id: string): Observable<MensajeDTO> {
 //  return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener/${id}`);
 //}


 public eliminarEvento(id: string): Observable<MensajeDTO> {
   return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-evento/${id}`);
 }

 public listarEventos(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.adminURL}/evento/listar-eventos`);
}


public listarTipos(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener-tipos`);
}

 public subirImagen(imagen: FormData): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.imgURL}/subir-imagen`, imagen);
 }

}

