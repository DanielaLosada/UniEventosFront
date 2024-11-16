import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
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
  tiposDeEvento: string[];
  

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
    this.tiposDeEvento = ['Concierto', 'Fiesta', 'Teatro', 'Deportes'];
  }

  private crearFormulario() {
    this.crearEventoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      localidades: this.formBuilder.array([]),
      imagenPortada: ['', [Validators.required]],
      imagenLocalidades: ['', [Validators.required]]
    });
  }

  get localidades(): FormArray {
    return this.crearEventoForm.get('localidades') as FormArray;
  }

  agregarLocalidad() {
    const localidadForm = this.formBuilder.group({
      nombreLocalidad: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]]
    });
    this.localidades.push(localidadForm);
  }

  eliminarLocalidad(index: number) {
    this.localidades.removeAt(index);
  }



  public crearEvento() {
    console.log(this.crearEventoForm.value);
    Swal.fire("Exito!", "Se ha creado un nuevo evento.", "success");
  }

  previewPortada: string | ArrayBuffer | null = null;
  previewLocalidades: string | ArrayBuffer | null = null;

  onFileChange(event: Event, type: string) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (type === 'portada') {
          this.previewPortada = reader.result;
        } else if (type === 'localidades') {
          this.previewLocalidades = reader.result;
        }
      };

      reader.readAsDataURL(file); // Convierte el archivo a base64 para usarlo en `<img>`
    }
  }
}

