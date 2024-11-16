import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { EventosService } from '../../servicios/eventos.service';
import { EventoDTO } from '../../dto/evento-dto';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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

  

  public crearEvento() {
    console.log(this.editarEventoForm.value);
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

  public obtenerEvento() {
    const eventoConsultado = this.eventosService.obtener(this.codigoEvento);
    if (eventoConsultado != undefined) {
      this.evento = eventoConsultado;
    }
  }
}


