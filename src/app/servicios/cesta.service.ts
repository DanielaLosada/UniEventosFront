import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CestaService {
  private itemsCesta: any[] = [];
  private totalCesta: number = 0;
  private totalEntradas: number = 0;
  private imagenEvento: string = '';
  private nombre: string = '';
  private direccion: string = '';
  private ciudad: string = '';

  // Métodos para gestionar los items
  agregarItem(item: any): void {
    this.itemsCesta.push(item);
  }

  obtenerItems(): any[] {
    return this.itemsCesta;
  }

  // Métodos para gestionar el total y las entradas
  setTotal(total: number, entradas: number): void {
    this.totalCesta = total;
    this.totalEntradas = entradas;
  }

  obtenerTotal(): number {
    return this.totalCesta;
  }

  obtenerEntradas(): number {
    return this.totalEntradas;
  }

  // Métodos para gestionar información adicional del evento
  setEventoInfo(imagen: string, nombre: string, direccion: string, ciudad: string): void {
    this.imagenEvento = imagen;
    this.nombre = nombre;
    this.direccion = direccion;
    this.ciudad = ciudad;
  }

  obtenerImagenEvento(): string {
    return this.imagenEvento;
  }

  obtenerNombreEvento(): string {
    return this.nombre;
  }

  obtenerDireccion(): string {
    return this.direccion;
  }

  obtenerCiudad(): string {
    return this.ciudad;
  }

  // Método para limpiar la cesta
  limpiarCesta(): void {
    this.itemsCesta = [];
    this.totalCesta = 0;
    this.totalEntradas = 0;
    this.imagenEvento = '';
    this.nombre = '';
    this.direccion = '';
    this.ciudad = '';
  }
}

