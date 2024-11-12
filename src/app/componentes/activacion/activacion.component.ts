import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {Router} from '@angular/router'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, } from '@angular/forms';

@Component({
  selector: 'app-activacion',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './activacion.component.html',
  styleUrl: './activacion.component.css'
})
export class ActivacionComponent {

  activacionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder  ,private router: Router) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.activacionForm = this.formBuilder.group({
      codigo: ['', [Validators.required]],
    },
  );
  }

  public activarCuenta() {
    if (this.activacionForm.valid) {
      console.log(this.activacionForm.value);
    }

    this.router.navigate(['/crear-evento']);
  }

}
