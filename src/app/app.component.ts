import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderUsuarioComponent } from './componentes/header-usuario/header-usuario.component';
import { FooterComponent } from './componentes/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, HeaderUsuarioComponent, FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontUniEventoss';
  footer= 'Universidad del Quindío - 2024-2'
}
