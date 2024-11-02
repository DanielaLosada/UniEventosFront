import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css'
})
export class EditarEventoComponent {

  editarEventoForm!: FormGroup;
  tiposDeEvento: string[];

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
    this.tiposDeEvento = ['Concierto', 'Fiesta', 'Teatro', 'Deportes'];
  }

  private crearFormulario() {
    this.editarEventoForm = this.formBuilder.group({
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
    return this.editarEventoForm.get('localidades') as FormArray;
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

  public onFileChange(event: any, tipo: string) {
    if (event.target.files.length > 0) {
      const files = event.target.files;

      switch (tipo) {
        case 'localidades':
          this.editarEventoForm.get('imagenLocalidades')?.setValue(files[0]);
          break;
        case 'portada':
          this.editarEventoForm.get('imagenPortada')?.setValue(files[0]);
          break;
      }
    }
  }

  public crearEvento() {
    console.log(this.editarEventoForm.value);
  }
}


