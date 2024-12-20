import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { CrearCuentaDTO } from '../../dto/crear-cuenta-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.crearFormulario();
  }

  private passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;
   
    // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
    return password === confirmaPassword ? null : { passwordsMismatch: true };
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
      confirmaPassword: ['', Validators.required]  // Añadir confirmación de contraseña al formulario
    },
    { validators: this.passwordsMatchValidator } as AbstractControlOptions
    );
  }
 
  public registrar() {
    const crearCuenta = this.registroForm.value as CrearCuentaDTO;
    this.authService.crearCuenta(crearCuenta).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cuenta creada',
          text: 'La cuenta se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
   }
   
}
