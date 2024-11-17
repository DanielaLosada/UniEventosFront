import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearCuentaDTO } from '../dto/crear-cuenta-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { LoginDTO } from '../dto/login-dto';


@Injectable({
 providedIn: 'root'
})
export class AuthService {


 private authURL = "http://localhost:8083/api/auth";


 constructor(private http: HttpClient) { }

 public crearCuenta(cuentaDTO: CrearCuentaDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.authURL}/cuenta/crear-cuenta`, cuentaDTO);
 }
 
 public iniciarSesion(loginDTO: LoginDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.authURL}/cuenta/iniciar-sesion`, loginDTO);
 }
 
}

