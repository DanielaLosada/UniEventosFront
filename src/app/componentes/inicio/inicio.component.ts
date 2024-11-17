import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicoService } from '../../servicios/publico.service';
import { ItemEventoDTO } from '../../dto/item-evento-dto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  eventos: ItemEventoDTO[];
  imagenesCarrusel: String[];
  tiposDeEvento: String[];

  constructor(private publicoService: PublicoService) {
    this.eventos = [];
    this.imagenesCarrusel = [];
    this.tiposDeEvento = [];
    this.obtenerEventos();
    this.listarTipos();
 }

 public listarTipos(){
  this.publicoService.listarTipos().subscribe({
    next: (data) => {
      this.tiposDeEvento = data.respuesta;
    },
    error: (error) => {
      console.error(error);
    },
  });
 }
 
 public obtenerEventos(){
  this.publicoService.listarEventos().subscribe({
    next: (data) => {
      this.eventos = data.respuesta;
      // Extraer las imágenes de portada para el carrusel
      this.imagenesCarrusel = this.eventos.map(evento => evento.urlImagenPoster);
    },
    error: (error) => {
      console.error(error);
    },
  });
 }
 
 

}
