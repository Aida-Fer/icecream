import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  rol:string = '';
  constructor(){}

  ngOnInit(): void {
    this.rol = ''+localStorage.getItem('rol');
  }
}
