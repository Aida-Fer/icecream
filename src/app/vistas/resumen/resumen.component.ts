import { Component, OnInit } from '@angular/core';
import { IngresosService } from 'src/app/service/ingresos/ingresos.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit{
  lista: any = []
  constructor(private api: IngresosService) { }

  ngOnInit(): void {
    this.cargarlista();
  }

  cargarlista() {
    this.api.getingredientes().subscribe(data => {
      this.lista = data.result;
      console.log(this.lista)
    })
  }
}
