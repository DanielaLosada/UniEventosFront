import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
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



}
