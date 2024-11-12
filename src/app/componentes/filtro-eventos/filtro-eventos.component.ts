import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtro-eventos',
  standalone: true,
  imports: [RouterModule,
    CommonModule
  ],
  templateUrl: './filtro-eventos.component.html',
  styleUrl: './filtro-eventos.component.css'
})
export class FiltroEventosComponent {

}
