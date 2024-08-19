import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from "./vistas/usuarios/usuarios.component";
import { PagnoexistsComponent } from "./pagnoexists/pagnoexists.component";
import { LoginComponent } from "./vistas/login/login.component";
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { ProductoComponent } from "./vistas/producto/producto.component";
import { CategoriaComponent } from "./vistas/categoria/categoria.component";
import { IngredientesComponent } from "./vistas/ingredientes/ingredientes.component";
import { ProveedoresComponent } from "./vistas/proveedores/proveedores.component";
import { RecetasComponent } from "./vistas/recetas/recetas.component";
import { IngresosComponent } from './vistas/ingresos/ingresos.component';
import { ResumenComponent } from './vistas/resumen/resumen.component';
import { ProduccionComponent } from './vistas/produccion/produccion.component';
import { ClientesComponent } from './vistas/clientes/clientes.component';
import { VentasComponent } from './vistas/ventas/ventas.component';
import { FacturaComponent } from './vistas/factura/factura.component';
import { WebComponent } from './vistas/web/web.component';
import { InfprodComponent } from './vistas/infprod/infprod.component';
import { RepventasComponent } from './vistas/repventas/repventas.component';
import { ResumenprodComponent } from './vistas/resumenprod/resumenprod.component';
import { loginGuard } from './guards/login.guard';
// import { AsaboresComponent } from './vistas/sabores/asabores/asabores.component';

const routes: Routes = [
  {path: "" , redirectTo:"web", pathMatch: "full"},
  {path: "login" , component: LoginComponent},
  {path:"dashboard", component: DashboardComponent, canActivate: [loginGuard]},
  {path: "usu" , component: UsuariosComponent, canActivate: [loginGuard]},
  {path: "pag" , component: PagnoexistsComponent, canActivate: [loginGuard]},
  {path: "prod" , component: ProductoComponent, canActivate: [loginGuard]},
  {path: "cat" , component: CategoriaComponent, canActivate: [loginGuard]},
  {path: "ing" , component: IngredientesComponent, canActivate: [loginGuard]},
  {path: "prov" , component: ProveedoresComponent, canActivate: [loginGuard]},
  {path: "recetas" , component: RecetasComponent, canActivate: [loginGuard]},
  {path: "ingresos" , component: IngresosComponent, canActivate: [loginGuard]},
  {path: "resumen" , component: ResumenComponent, canActivate: [loginGuard]},
  {path: "produccion" , component: ProduccionComponent, canActivate: [loginGuard]},
  {path: "clie" , component: ClientesComponent, canActivate: [loginGuard]},
  {path: "ventas" , component: VentasComponent, canActivate: [loginGuard]},
  {path: "factura/:id" , component: FacturaComponent, canActivate: [loginGuard]},
  {path: "web" , component: WebComponent, canActivate: [loginGuard]},
  {path: "infprod" , component: InfprodComponent, canActivate: [loginGuard]},
  {path: "repventas" , component: RepventasComponent, canActivate: [loginGuard]},
  {path: "resumenprod" , component: ResumenprodComponent, canActivate: [loginGuard]},
  // { path: 'addSab', component: AsaboresComponent },
  {path: "**" , redirectTo:"/pag", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
