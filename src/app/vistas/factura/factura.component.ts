import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from 'src/app/service/factura/factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit{
  factura: string = '';
  fecha: string = '';
  nombre: string = '';
  ci: string = '';
  usuario : string = '';
  total : string = '';
  id: string = '';
  lista: any[] = [];

  constructor(private router: ActivatedRoute, private api: FacturaService){
  }

  ngOnInit(): void {
    this.id = ''+this.router.snapshot.paramMap.get('id');
    this.cargar();
  }

  cargar(){    
    this.api.getfactura(this.id).subscribe(data => {
      console.log(data)
      this.factura = data.result.idventa;
      this.fecha = data.result.fecha;
      this.ci = data.result.ci;
      this.total = data.result.total;
      this.usuario = data.result.usuario;
      this.lista = data.mensaje;
  })
  }

  
  printDiv() {
    var contenido = document.getElementById('imprimir')!.innerHTML;
    var contenidoOriginal = document.body.innerHTML;

    document.body.innerHTML = contenido!

    window.print();

    document.body.innerHTML = contenidoOriginal;
  }
}
