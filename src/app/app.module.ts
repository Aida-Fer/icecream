import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { Select2Module } from 'ng-select2-component';

//Formularios//
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagnoexistsComponent } from './pagnoexists/pagnoexists.component';
import { HeaderComponent } from './plantilla/header/header.component';
import { FooterComponent } from './plantilla/footer/footer.component';
import { LoginComponent } from './vistas/login/login.component';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { ProductoComponent } from './vistas/producto/producto.component';
import { CategoriaComponent } from './vistas/categoria/categoria.component';
import { ProveedoresComponent } from './vistas/proveedores/proveedores.component';
import { RecetasComponent } from './vistas/recetas/recetas.component';
import { IngredientesComponent } from './vistas/ingredientes/ingredientes.component';
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

// Libreria Bootstrap

@NgModule({
  declarations: [
    AppComponent,
    PagnoexistsComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    UsuariosComponent,
    DashboardComponent,
    ProductoComponent,
    CategoriaComponent,
    ProveedoresComponent,
    RecetasComponent,
    IngredientesComponent,
    IngresosComponent,
    ResumenComponent,
    ProduccionComponent,
    ClientesComponent,
    VentasComponent,
    FacturaComponent,
    WebComponent,
    InfprodComponent,
    RepventasComponent,
    ResumenprodComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Select2Module
  ],
  providers: [{provide: APP_BASE_HREF, useValue : "/"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
