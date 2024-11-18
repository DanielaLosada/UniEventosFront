import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CestaService } from '../../servicios/cesta.service';
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterModule
    , CommonModule
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  itemsCesta: any[] = [];
  total: number = 0;
  entradas: number = 0;
  imagenEvento: string = '';
  nombreEvento: string = '';
  direccion: string = '';
  ciudad: string = '';

  constructor(private cestaService: CestaService) {}

  ngOnInit(): void {
    this.itemsCesta = this.cestaService.obtenerItems();
    this.total = this.cestaService.obtenerTotal();
    this.entradas = this.cestaService.obtenerEntradas();
    this.imagenEvento = this.cestaService.obtenerImagenEvento();
    this.nombreEvento = this.cestaService.obtenerNombreEvento();
    this.direccion = this.cestaService.obtenerDireccion();
    this.ciudad = this.cestaService.obtenerCiudad();
  }

}
