import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';
import { CambiarContraseniaComponent } from './componentes/cambiar-contrasenia/cambiar-contrasenia.component';
import { OlvideContraseniaComponent } from './componentes/olvide-contrasenia/olvide-contrasenia.component';
import { EditarEventoComponent } from './componentes/editar-evento/editar-evento.component';
import { GestionEventosComponent } from './componentes/gestion-eventos/gestion-eventos.component';
import { DetalleEventoComponent } from './componentes/detalle-evento/detalle-evento.component';
import { ActivacionComponent } from './componentes/activacion/activacion.component';
import { FiltroEventosComponent } from './componentes/filtro-eventos/filtro-eventos.component';

export const routes: Routes = [
   { path: 'inicio', component: InicioComponent },
   { path: 'login', component: LoginComponent },
   { path: 'registro', component: RegistroComponent },
   {path: 'crear-evento', component: CrearEventoComponent},
   {path: 'cambiar-contrasenia', component: CambiarContraseniaComponent},
   {path: 'olvide-contrasenia', component: OlvideContraseniaComponent},
   { path: 'editar-evento/:id', component: EditarEventoComponent },
   { path: 'gestion-eventos', component: GestionEventosComponent },
   { path: 'detalle-evento/:id', component: DetalleEventoComponent },
   { path: 'activar-cuenta', component: ActivacionComponent },
   {path:'filtrar-eventos' , component: FiltroEventosComponent},
   { path: "**", pathMatch: "full", redirectTo: "" }
];
