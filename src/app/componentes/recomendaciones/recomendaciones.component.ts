import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { ItemEventoDTO } from '../../dto/item-evento-dto';


@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.css'
})
export class RecomendacionesComponent {

  eventos: ItemEventoDTO[];

  constructor(
    private route: ActivatedRoute,
    private publicoService: PublicoService, 
    private router: Router
  ) {this.eventos = [];
  }

  irADetalle(nombre: String) {
    this.router.navigate(['/detalle-evento', nombre]);
  }

  irACompra(nombre: String ) {
    this.router.navigate(['/inicio-compra', nombre]);
  }

  ngOnInit(): void {
    this.publicoService.listarEventos().subscribe({
      next: (data) => {
        const eventosObtenidos = data.respuesta;
        // Seleccionar 3 eventos aleatorios
        this.eventos = this.obtenerEventosAleatorios(eventosObtenidos, 3);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  
  /**
   * Método para obtener un número específico de eventos aleatorios
   * @param eventos - Array de eventos
   * @param cantidad - Número de eventos a obtener
   * @returns Array con eventos aleatorios
   */
  obtenerEventosAleatorios(eventos: ItemEventoDTO[], cantidad: number): ItemEventoDTO[] {
    if (eventos.length <= cantidad) {
      // Si hay menos eventos que la cantidad solicitada, devolver todos
      return eventos;
    }
  
    // Mezclar el array de eventos y devolver los primeros `cantidad` elementos
    return eventos
      .map(evento => ({ evento, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, cantidad)
      .map(({ evento }) => evento);
  }
  
}
