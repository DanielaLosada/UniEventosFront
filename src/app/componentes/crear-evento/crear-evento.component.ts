import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { AdministradorService } from '../../servicios/administrador.service';
import { PublicoService } from '../../servicios/publico.service';
import { CrearEventoDTO } from '../../dto/crear-evento-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule], // Agrega CommonModule aquí
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent {

  crearEventoForm!: FormGroup;
  tiposDeEvento: String[];

  imagenPortada?: File;
  imagenLocalidad?: File;

  constructor(private formBuilder: FormBuilder,private publicoService: PublicoService, private administradorService: AdministradorService) {
    this.crearFormulario();
    this.tiposDeEvento = [];
    this.listarTipos();
  }

  private crearFormulario() {
    this.crearEventoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      imagenPortada: ['', [Validators.required]],
      imagenLocalidad: ['', [Validators.required]],
      localidades: this.formBuilder.array([]),
    });
  }

  get localidades(): FormArray {
    return this.crearEventoForm.get('localidades') as FormArray;
  }

  agregarLocalidad() {
    const localidadForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      aforo: ['', [Validators.required, Validators.min(0)]]
    });
    this.localidades.push(localidadForm);
  }

  eliminarLocalidad(index: number) {
    this.localidades.removeAt(index);
  }

  public subirImagen(tipo: string) {
    const formData = new FormData();
    const imagen = tipo === 'imagenPortada' ? this.imagenPortada : this.imagenLocalidad;
  
    if (imagen) {
      formData.append('imagen', imagen);
      this.administradorService.subirImagen(formData).subscribe({
        next: (data) => {
          this.crearEventoForm.get(tipo)?.setValue(data.respuesta);
          Swal.fire("Éxito!", `Se ha subido la imagen de ${tipo}.`, "success");
        },
        error: (error) => {
          Swal.fire("Error!", error.error.respuesta, "error");
        }
      });
    } else {
      Swal.fire("Error!", "Por favor seleccione una imagen antes de subirla.", "error");
    }
  }
  

   public crearEvento() {
    if (this.crearEventoForm.valid) {
      const crearEventoDTO = this.crearEventoForm.value as CrearEventoDTO;
      if (crearEventoDTO.fecha) {
        crearEventoDTO.fecha = `${crearEventoDTO.fecha}T00:00:00`;
      }
      this.administradorService.crearEvento(crearEventoDTO).subscribe({
        next: (data) => {
          Swal.fire("Exito!", "Se ha creado un nuevo evento.", "success");
        },
        error: error => {
          Swal.fire("Error!", error.error.respuesta, "error");
        }
      });
    } else {
      Swal.fire("Error!", "Por favor complete todos los campos obligatorios.", "error");
    }
  }
  
  public listarTipos(){
    this.publicoService.listarTipos().subscribe({
      next: (data) => {
        this.tiposDeEvento = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
   }
   
   

  previewPortada: string | ArrayBuffer | null = null;
  previewLocalidades: string | ArrayBuffer | null = null;

  public onFileChange(event: any, tipo: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      tipo == 'imagenLocalidad' ? (this.imagenLocalidad = file) : (this.imagenPortada = file);
    }
   }
   
}

