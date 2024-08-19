import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ProduccionService } from 'src/app/service/produccion/produccion.service';

@Component({
  selector: 'app-resumenprod',
  templateUrl: './resumenprod.component.html',
  styleUrls: ['./resumenprod.component.css']
})
export class ResumenprodComponent {
  date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
  lista: any = []
  constructor(private api: ProduccionService) { }

  ngOnInit(): void {
    this.cargarlista();
  }

  cargarlista() {
    this.api.getresumen().subscribe(data => {
      this.lista = data.result;
      console.log(this.lista)
    })
  }
}
