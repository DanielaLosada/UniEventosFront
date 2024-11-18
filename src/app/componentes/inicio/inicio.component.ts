import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicoService } from '../../servicios/publico.service';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule, FormsModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  eventos: ItemEventoDTO[];
  imagenesCarrusel: String[];
  tiposDeEvento: String[];
  ciudades: String[];

  filtros = {
    nombre: '',
    tipoEvento: '',
    ciudad: '',
  };

  constructor(private publicoService: PublicoService, private router: Router) {
    this.eventos = [];
    this.imagenesCarrusel = [];
    this.tiposDeEvento = [];
    this.ciudades= ['Bogota', 'Medellin', 'Bucaramanga', 'Cali'];
    this.obtenerEventos();
    this.listarTipos();
 }

  aplicarFiltros() {
    const filtros = {
      nombre: this.filtros.nombre || '',
      tipoEvento: this.filtros.tipoEvento || '',  // Si es vacío, se envía como cadena vacía
      ciudad: this.filtros.ciudad || '',        // Lo mismo para ciudad
    };
    this.router.navigate(['/filtrar-eventos'], { queryParams: filtros });
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
