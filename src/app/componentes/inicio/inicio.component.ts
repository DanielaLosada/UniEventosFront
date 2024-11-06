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

  constructor(private publicoService: PublicoService) {
    this.eventos = [];
    this.obtenerEventos();
 }

 public obtenerEventos(){
  this.publicoService.listarEventos().subscribe({
    next: (data) => {
      this.eventos = data.respuesta;
    },
    error: (error) => {
      console.error(error);
    },
  });
 }
 
 

}
