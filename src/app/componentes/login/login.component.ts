import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { LoginDTO } from '../../dto/login-dto';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenService: TokenService) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    },
    );
  }

  public login() {
    const loginDTO = this.loginForm.value as LoginDTO;
    this.authService.iniciarSesion(loginDTO).subscribe({
      next: (data) => {
        this.tokenService.login(data.respuesta.token);
      },
      error: (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta
        });
      },
    });
   }
   
}
