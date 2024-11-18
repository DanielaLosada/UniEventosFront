import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { InfoEventoDTO } from '../../dto/info-evento-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-compra',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './inicio-compra.component.html',
  styleUrl: './inicio-compra.component.css'
})
export class InicioCompraComponent {

  evento: InfoEventoDTO | undefined;
  errorMessage: string | null = null; // Para manejar errores

  constructor(
    private route: ActivatedRoute, 
    private publicoService: PublicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'nombre' desde la ruta
    this.route.paramMap.subscribe((params) => {
      const nombre = params.get('nombre'); // Obtén el parámetro 'nombre'
      if (nombre) {
        this.obtenerEvento(nombre); // Llama al método para cargar el evento
      } else {
        this.errorMessage = 'No se proporcionó un nombre válido para el evento.';
      }
    });
  }

  calcularSubtotal(precio: number, cantidad: number): number {
    return precio * cantidad;
  }

  obtenerEvento(nombre: string): void {
    this.publicoService.obtenerEvento(nombre).subscribe({
      next: (data) => { 
        if (data && data.respuesta) {
          const evento = data.respuesta;
          this.evento = {
            ...evento,
            fecha: formatDate(new Date(evento.fecha), 'dd/MM/yyyy', 'en-US'),
            listaLocalidades: evento.listaLocalidades.map((localidad: any) => ({
              ...localidad,
              cantidadSeleccionada: 0 // Inicializamos la cantidad seleccionada
            }))
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
