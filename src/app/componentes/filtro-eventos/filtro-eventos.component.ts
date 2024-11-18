import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-filtro-eventos',
  standalone: true,
  imports: [RouterModule,
    CommonModule
  ],
  templateUrl: './filtro-eventos.component.html',
  styleUrl: './filtro-eventos.component.css'
})
export class FiltroEventosComponent {

  eventos: ItemEventoDTO[];

  constructor(
    private route: ActivatedRoute,
    private publicoService: PublicoService, 
    private router: Router
  ) {this.eventos = [];}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const filtros = {
        nombre: params['nombre'] || '',
        tipoEvento: params['tipoEvento'] || '',  // Si es vacío, se envía como cadena vacía
        ciudad: params['ciudad'] || '',        // Lo mismo para ciudad
      };
      this.obtenerEventos(filtros);
    });
  }

  irADetalle(nombre: String) {
    this.router.navigate(['/detalle-evento', nombre]);
  }

  irACompra(nombre: String ) {
    this.router.navigate(['/inicio-compra', nombre]);
  }

  obtenerEventos(filtros: any) {
    this.publicoService.filtrarEventos(filtros).subscribe({
      next: (data) => {
        // Formatear las fechas antes de asignarlas
        this.eventos = data.respuesta.map((evento: any) => ({
          ...evento,
          fecha: formatDate(
            new Date(evento.fecha), // Convierte la fecha ISO a Date
            'dd/MM/yyyy', // Cambia este formato según tus necesidades
            'en-US'
          ),
        }));
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
