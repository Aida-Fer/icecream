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
// import { AsaboresComponent } from './vistas/sabores/asabores/asabores.component';

const routes: Routes = [
  {path: "" , redirectTo:"web", pathMatch: "full"},
  {path: "login" , component: LoginComponent},
  {path:"dashboard", component: DashboardComponent},
  {path: "usu" , component: UsuariosComponent},
  {path: "pag" , component: PagnoexistsComponent},
  {path: "prod" , component: ProductoComponent},
  {path: "cat" , component: CategoriaComponent},
  {path: "ing" , component: IngredientesComponent},
  {path: "prov" , component: ProveedoresComponent},
  {path: "recetas" , component: RecetasComponent},
  {path: "ingresos" , component: IngresosComponent},
  {path: "resumen" , component: ResumenComponent},
  {path: "produccion" , component: ProduccionComponent},
  {path: "clie" , component: ClientesComponent},
  {path: "ventas" , component: VentasComponent},
  {path: "factura/:id" , component: FacturaComponent},
  {path: "web" , component: WebComponent},
  {path: "infprod" , component: InfprodComponent},
  {path: "repventas" , component: RepventasComponent},
  // { path: 'addSab', component: AsaboresComponent },
  {path: "**" , redirectTo:"/pag", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
