import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';

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
    if (this.registroForm.valid) {
      console.log(this.registroForm.value);
    }
  }
}
