import { LocalidadDTO } from "./localidad-dto";
import { CrearAlojamientoDTO } from "./crear-alojamiento-dto";

export interface CrearEventoDTO {
    nombre: String, 
    descripcion: String, 
    direccion : String, 
    ciudad : String, 
    fecha : String, 
    tipo : String, 
    imagenPortada : String, 
    imagenLocalidad : String, 
    localidades : LocalidadDTO[],
}
