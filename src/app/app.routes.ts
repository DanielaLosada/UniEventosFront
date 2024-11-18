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
import { EventosComponent } from './componentes/eventos/eventos.component';
import { InicioCompraComponent } from './componentes/inicio-compra/inicio-compra.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { InformacionPagoComponent } from './componentes/informacion-pago/informacion-pago.component';
import { OrdenPagoComponent } from './componentes/orden-pago/orden-pago.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { EliminarCuentaComponent } from './componentes/eliminar-cuenta/eliminar-cuenta.component';
import { HistorialComprasComponent } from './componentes/historial-compras/historial-compras.component';
import { CrearCuponComponent } from './componentes/crear-cupon/crear-cupon.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { PerfilAdminComponent } from './componentes/perfil-admin/perfil-admin.component';
import { EliminarCuentaAdminComponent } from './componentes/eliminar-cuenta-admin/eliminar-cuenta-admin.component';
import { RecomendacionesComponent } from './componentes/recomendaciones/recomendaciones.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
export const routes: Routes = [
   { path: 'inicio', component: InicioComponent},
   { path: 'login', component: LoginComponent,canActivate: [LoginGuard] },
   { path: 'registro', component: RegistroComponent },
   {path: 'crear-evento', component: CrearEventoComponent,  canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }},
   {path: 'cambiar-contrasenia', component: CambiarContraseniaComponent},
   {path: 'olvide-contrasenia', component: OlvideContraseniaComponent },
   { path: 'editar-evento/:id', component: EditarEventoComponent,  canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'gestion-eventos', component: GestionEventosComponent,  canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'detalle-evento/:nombre', component: DetalleEventoComponent},
   { path: 'activar-cuenta', component: ActivacionComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
   {path:'filtrar-eventos' , component: FiltroEventosComponent},
   {path:'eventos', component: EventosComponent},
   {path:'inicio-compra/:nombre',component:InicioCompraComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }},
   {path:'carrito',component:CarritoComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }},
   {path: 'informacion-pago',component:InformacionPagoComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }},
   {path:'orden-pago',component:OrdenPagoComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }},
   {path:'perfil-usuario',component:PerfilComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }},
   {path:'eliminar-cuenta',component:EliminarCuentaComponent,canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR","CLIENTE"] }},
   {path: 'historial-compra',component:HistorialComprasComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }},
   {path:'crear-cupon',component:CrearCuponComponent,  canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }},
   {path:'reportes',component:ReportesComponent,  canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }},
   {path:'perfilAdmin' , component:PerfilAdminComponent,  canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }},
   {path:'eliminar-cuenta-admin', component:EliminarCuentaAdminComponent,  canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }},
   {path: 'recomendaciones', component:RecomendacionesComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }},
   { path: "**", pathMatch: "full", redirectTo: "" }
];
