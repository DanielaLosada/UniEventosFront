import { Injectable } from '@angular/core';
import { InfoEventoDTO } from '../dto/info-evento-dto';


@Injectable({
 providedIn: 'root'
})
export class EventosService {


 eventos:InfoEventoDTO [];


 constructor() {
   this.eventos = [];
 }


 public listar(){
   return this.eventos;
 }
}
