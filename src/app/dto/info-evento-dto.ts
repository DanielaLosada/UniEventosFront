import { LocalidadDTO } from "./localidad-dto";


export interface InfoEventoDTO {
   imagenPortada: string;
  imagenLocalidades: string;
  nombre: string;
  descripcion: string;
  direccion: string;
  tipoEvento: string;
  fecha: string;
  ciudad: string;
  listaLocalidades: {
    nombre: string;
    precio: number;
    entradasVendidas: number;
    aforo: number;
    cantidadSeleccionada: number;
  }[];
}
