import { Component, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  rol:string = '';

  userservice = inject(ApiService);
  constructor(private api: UsuarioService, private router: Router){}

  salir(){
    // this.api.logout().subscribe(data => {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      this.router.navigate(['login']);
    // })
  }

  ngOnInit(): void {
    this.rol = ''+localStorage.getItem('rol');
  }
}
