import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './componentes/footer/footer.component';
import { HeaderUsuarioComponent } from "./componentes/header-usuario/header-usuario.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, FooterComponent,
    HeaderUsuarioComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontUniEventoss';
  footer= 'Universidad del Quindío - 2024-2'
}
