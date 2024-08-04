import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  nombre: string = '';
  
  ngOnInit(): void {
    let fecha = formatDate(new Date(), 'HH', 'en-US')
    if (Number(fecha) < 12) {
      this.nombre = 'Buenos dias '+ localStorage.getItem('nombre');
    }else
    if (Number(fecha) >= 12 && Number(fecha) < 18) {
      this.nombre = 'Buenas tardes '+ localStorage.getItem('nombre');
    }else
    if (Number(fecha) >= 18) {
      this.nombre = 'Buenas noches '+ localStorage.getItem('nombre');
    }
  }
}