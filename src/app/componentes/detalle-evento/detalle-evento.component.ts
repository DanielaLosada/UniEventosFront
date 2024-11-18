import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { InfoEventoDTO } from '../../dto/info-evento-dto';
import { Router } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.css'],
})
export class DetalleEventoComponent implements OnInit {
  evento: InfoEventoDTO | undefined;
  errorMessage: string | null = null; // Para manejar errores
  isLogged = false;
  constructor(
    private route: ActivatedRoute, 
    private publicoService: PublicoService,
    private router: Router,
    private tokenService: TokenService
  ) {this.isLogged = this.tokenService.isLogged()};

 

 

  ngOnInit(): void {
    // Obtener el parámetro 'nombre' desde la ruta
    this.route.paramMap.subscribe((params) => {
      const nombre = params.get('nombre'); // Obtén el parámetro 'nombre'
      if (nombre) {
        console.log('Nombre del evento capturado:', nombre);
        this.obtenerEvento(nombre); // Llama al método para cargar el evento
      } else {
        this.errorMessage = 'No se proporcionó un nombre válido para el evento.';
      }
    });
  }

  irACompra(nombre: string | undefined) {
    
    this.router.navigate(['/inicio-compra', nombre]);
  }

  obtenerEvento(nombre: string): void {
    this.publicoService.obtenerEvento(nombre).subscribe({
      next: (data) => { 
        if (data && data.respuesta) {
          const evento = data.respuesta;
          this.evento = {
            ...evento,
            fecha: formatDate(new Date(evento.fecha), 'dd/MM/yyyy', 'en-US'),
          };
        } else {
          this.errorMessage = 'No se encontraron datos para este evento.';
        }
      },
      error: (error) => {
        console.error('Error al obtener el evento:', error);
        this.errorMessage = 'Ocurrió un error al cargar el evento. Inténtalo de nuevo.';
      },
    });
  }
  
}
