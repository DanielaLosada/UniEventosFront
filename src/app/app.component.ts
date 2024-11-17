import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './componentes/footer/footer.component';
import { TokenService } from './servicios/token.service';
import { OnInit } from '@angular/core';
import { HeaderComponent } from './componentes/header/header.component';
import { HeaderUsuarioComponent } from "./componentes/header-usuario/header-usuario.component";
import { HeaderAdminComponent } from './componentes/header-admin/header-admin.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, FooterComponent,CommonModule,
    HeaderUsuarioComponent, HeaderAdminComponent, HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLogged: boolean = false;
  role: string = ''; // 'ADMIN' or 'USER'

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    // Verifica si el usuario está logueado
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      // Obtiene el rol del usuario
      this.role = this.tokenService.getRol();
    }
  }

  logout() {
    this.tokenService.logout();
    this.isLogged = false;
    this.role = ''; // Redefinir el rol si hace logout
  }

  
}
