import { Component } from '@angular/core';
import { VentasService } from 'src/app/service/ventas/ventas.service';

@Component({
  selector: 'app-repventas',
  templateUrl: './repventas.component.html',
  styleUrls: ['./repventas.component.css']
})
export class RepventasComponent {
  fecha: string = '';
  usuario: string = '';
  totalventa: string = '';
  montototal: string = '';
  sabores: string = '';
  list: any[] = [];

  constructor(private api:VentasService){

  }

  mostrar(){
    this.api.getreport({ fecha: this.fecha }).subscribe(data => {
      this.totalventa = data.result.totalventa;
      this.montototal = data.result.montototal;
      this.sabores = data.result.sabores;
      this.usuario = data.message;
      this.list = data.detalle;
      console.log(data);
    })
  }
}
