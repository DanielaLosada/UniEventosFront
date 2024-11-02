import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { EventosService } from '../../servicios/eventos.service';
import { EventoDTO } from '../../dto/evento-dto';
import { ActivatedRoute } from '@angular/router';

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
  codigoEvento: string = '';
  evento: EventoDTO | undefined;

  constructor(private formBuilder: FormBuilder,  private route: ActivatedRoute, private eventosService: EventosService) {
    this.crearFormulario();
    this.tiposDeEvento = ['Concierto', 'Fiesta', 'Teatro', 'Deportes'];
    this.route.params.subscribe((params) => {
      this.codigoEvento = params['id'];
      this.obtenerEvento();
    });
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

  ngOnInit(): void {
    this.editarEventoForm = this.formBuilder.group({
      nombre: [this.evento?.nombre || ''],
      descripcion: [this.evento?.descripcion || ''],
      tipo: [this.evento?.tipo || ''],
      direccion: [this.evento?.direccion || ''],
      ciudad: [this.evento?.ciudad || ''],
      localidades: this.formBuilder.array(this.evento?.localidades?.map(localidad => this.formBuilder.group({
        nombreLocalidad: [localidad?.nombre || ''],
        precio: [localidad?.precio || 0]
      })) || [])
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

  public obtenerEvento() {
    const eventoConsultado = this.eventosService.obtener(this.codigoEvento);
    if (eventoConsultado != undefined) {
      this.evento = eventoConsultado;
    }
  }
}


