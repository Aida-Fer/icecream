import { Component } from '@angular/core';
import { ProduccionService } from 'src/app/service/produccion/produccion.service';

@Component({
  selector: 'app-infprod',
  templateUrl: './infprod.component.html',
  styleUrls: ['./infprod.component.css']
})
export class InfprodComponent {
  fecha: string = '';
  usuario: string = '';
  totalsabores: string = '';
  costototal: string = '';
  bandejas: string = '';
  list: any[] = [];

  constructor(private api:ProduccionService){

  }

  mostrar(){
    this.api.getreport({ fecha: this.fecha }).subscribe(data => {
      this.totalsabores = data.result.sabores;
      this.costototal = data.result.costo;
      this.bandejas = data.result.bandejas;
      this.usuario = data.message;
      this.list = data.detalle;
      console.log(data);
    })
  }
}
