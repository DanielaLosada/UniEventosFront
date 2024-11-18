import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  constructor(private tokenService: TokenService) {

  }
  public logout() {
    this.tokenService.logout();
  }

}
