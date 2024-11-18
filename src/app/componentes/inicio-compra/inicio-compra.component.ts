import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { InfoEventoDTO } from '../../dto/info-evento-dto';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CestaService } from '../../servicios/cesta.service';


@Component({
  selector: 'app-inicio-compra',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './inicio-compra.component.html',
  styleUrl: './inicio-compra.component.css'
})
export class InicioCompraComponent {

  evento: InfoEventoDTO | null = null;
  errorMessage: string | null = null; // Para manejar errores
  total: number = 0;
  entradas: number=0 ;
  descuento: number = 0;
  totalConDescuento: number = 0;
  codigoAplicado: boolean = false; // Para controlar si el código fue aplicado
  codigo: string = '';

  constructor(
    private route: ActivatedRoute, 
    private publicoService: PublicoService,
    private router: Router,
    private cestaService: CestaService
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

  actualizarCantidad(localidad: any, event: Event): void {
    const inputElement = event.target as HTMLSelectElement; // Cast explícito
    const cantidadNumerica = parseInt(inputElement.value, 10) || 0;
    localidad.cantidadSeleccionada = cantidadNumerica;
    this.calcularTotal();
  }

  calcularTotal(): void {
    // Inicializar las variables
    this.total = 0;
    this.entradas = 0;
  
    // Calcular total y entradas con reduce
    this.evento?.listaLocalidades.forEach(localidad => {
      // Sumar el total
      this.total += (localidad.precio * (localidad.cantidadSeleccionada || 0));
      // Sumar el número de entradas seleccionadas
      this.entradas += (localidad.cantidadSeleccionada ?? 0);
    });
  
    // Aplicar descuento si se ha introducido un código promocional
    if (this.codigoAplicado) {
      this.aplicarDescuento();
    }
  }
  
  aplicarDescuento(): void {
    if (this.codigo === 'SUPERDESCUENTO') {
      this.descuento = this.total * 0.15;  // Descuento del 15%
    } else {
      this.descuento = 0;
    }
    this.totalConDescuento = this.total - this.descuento;
  }
  
  aplicarCodigo(codigo: string): void {
    this.codigo = codigo;
    this.codigoAplicado = true;
    this.aplicarDescuento();
  }

  anadirACesta(): void {
    const itemsSeleccionados = this.evento?.listaLocalidades.filter(localidad => localidad.cantidadSeleccionada > 0);
  
    if (itemsSeleccionados && itemsSeleccionados.length > 0) {
      itemsSeleccionados.forEach(item => {
        this.cestaService.agregarItem({
          nombre: item.nombre,
          cantidad: item.cantidadSeleccionada,
          precio: item.precio,
          subtotal: item.precio * item.cantidadSeleccionada
        });
      });
  
      // Guardar el total, número de entradas y la información del evento
      this.cestaService.setTotal(this.totalConDescuento || this.total, this.entradas);
      this.cestaService.setEventoInfo(
        this.evento?.imagenPortada|| '',
        this.evento?.nombre || '',
        this.evento?.direccion || '',
        this.evento?.ciudad || ''
      );
  
      // Navegar a la página de la cesta
      this.router.navigate(['/carrito']);
    } else {
      alert('Por favor, selecciona al menos una entrada.');
    }
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
