import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-header-usuario',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header-usuario.component.html',
  styleUrl: './header-usuario.component.css'
})
export class HeaderUsuarioComponent {

  constructor(private tokenService: TokenService) {

 }
 public logout() {
   this.tokenService.logout();
 }

 
  
}
