import { Component, OnInit } from '@angular/core';

//Formularios//
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from "../../service/usuarios/usuario.service";
import { loginI } from "../../Models/login.interface";
import { ResponseI } from "../../Models/response.interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contraseña: new FormControl('', Validators.required)
  })

  constructor(private api:UsuarioService, private router:Router) {}

  errorStatus:boolean = false;
  errorMsj:any = "";

  ngOnInit(): void{
    //this.checkLocalStorage();
  }

  //Comprobar si ya existe el token//
  // checkLocalStorage(){
  //   if(localStorage.getItem('token')){
  //     this.router.navigate(['dashboard']);
  //   }
  // }

  onLogin(form:any){
    this.api.loginUsu(form).subscribe(data =>{
      let dataResponse: ResponseI = data;
      if(dataResponse.status == "OK"){
        localStorage.setItem('token', dataResponse.result);
        //localStorage.setItem('rol');
        localStorage.setItem('nombre',data.nombre);
        this.router.navigate(['dashboard']);
      }
      this.errorStatus = true;
      this.errorMsj = dataResponse.result;
      //console.log(data);
    })
  }


}


