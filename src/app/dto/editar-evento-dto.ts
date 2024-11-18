import { LocalidadDTO } from "./localidad-dto";

export interface EditarEventoDTO {
    nombre: String, 
    descripcion: String, 
    direccion: String, 
    ciudad : String, 
    fecha : String, 
    tipo : String, 
    estado: String,
    imagenPoster : String, 
    imagenLocalidades : String, 
    localidades : LocalidadDTO[]
}
