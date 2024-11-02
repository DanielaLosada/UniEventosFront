import { Component } from '@angular/core';
import { RouteConfigLoadEnd, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,AbstractControlOptions } from '@angular/forms';


@Component({
  selector: 'app-cambiar-contrasenia',
  standalone: true,
  imports: [RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrl: './cambiar-contrasenia.component.css'
})
export class CambiarContraseniaComponent {

  cambiarContraseniaForm!: FormGroup ;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  private passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;
   
    // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
    return password === confirmaPassword ? null : { passwordsMismatch: true };
  }

  private crearFormulario() {
    this.cambiarContraseniaForm = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
      confirmaPassword: ['', Validators.required]  // Añadir confirmación de contraseña al formulario
    },
    { validators: this.passwordsMatchValidator } as AbstractControlOptions
    );
  }

  public cambiarContrasenia() {
    if (this.cambiarContraseniaForm.valid) {
      console.log(this.cambiarContraseniaForm.value);
    }
  }
}






