import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';


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

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      contrasenia: ['', [Validators.required]],
    },
    );
  }

  public login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }

}
}
