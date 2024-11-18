import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { PublicoService } from '../../servicios/publico.service';
import { ItemEventoDTO } from '../../dto/item-evento-dto';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit {
  eventos:ItemEventoDTO[];

  constructor(private publicoService: PublicoService, private router: Router) {this.eventos = [];}

  ngOnInit(): void{
    this.publicoService.listarEventos().subscribe({
      next: (data) => {
        this.eventos = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
   }

   irADetalle(nombre: String) {
    this.router.navigate(['/detalle-evento', nombre]);
  }
  irACompra(nombre: String) {
    this.router.navigate(['/inicio-compra', nombre]);
  }
}
