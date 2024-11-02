import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {Router} from '@angular/router'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, } from '@angular/forms';

@Component({
  selector: 'app-olvide-contrasenia',
  standalone: true,
  imports: [ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './olvide-contrasenia.component.html',
  styleUrl: './olvide-contrasenia.component.css'
})
export class OlvideContraseniaComponent {

  olvideContraseniaForm!: FormGroup;

  constructor(private formBuilder: FormBuilder  ,private router: Router) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.olvideContraseniaForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    },
  );
  }

  public olvideContrasenia() {
    if (this.olvideContraseniaForm.valid) {
      console.log(this.olvideContraseniaForm.value);
    }

    this.router.navigate(['/cambiar-contrasenia']);
  }

}
