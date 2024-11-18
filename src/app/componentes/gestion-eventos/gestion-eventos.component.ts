import { Component } from '@angular/core';
import { EventosService } from '../../servicios/eventos.service';
import { RouterModule } from '@angular/router';
import { InfoEventoDTO } from '../../dto/info-evento-dto';
import Swal from 'sweetalert2';


@Component({
 selector: 'app-gestion-eventos',
 standalone: true,
 imports: [RouterModule],
 templateUrl: './gestion-eventos.component.html',
 styleUrl: './gestion-eventos.component.css'
})
export class GestionEventosComponent {

 constructor(public eventosService:EventosService) {
 }
 
}

