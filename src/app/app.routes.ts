import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';
import { CambiarContraseniaComponent } from './componentes/cambiar-contrasenia/cambiar-contrasenia.component';
import { OlvideContraseniaComponent } from './componentes/olvide-contrasenia/olvide-contrasenia.component';
import { EditarEventoComponent } from './componentes/editar-evento/editar-evento.component';

export const routes: Routes = [
   { path: '', component: InicioComponent },
   { path: 'login', component: LoginComponent },
   { path: 'registro', component: RegistroComponent },
   {path: 'crear-evento', component: CrearEventoComponent},
   {path: 'cambiar-contrasenia', component: CambiarContraseniaComponent},
   {path: 'olvide-contrasenia', component: OlvideContraseniaComponent},
   {path: 'editar-evento', component: EditarEventoComponent},
   { path: "**", pathMatch: "full", redirectTo: "" }
];
