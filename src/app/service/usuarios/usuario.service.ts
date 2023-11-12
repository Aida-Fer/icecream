import { Injectable } from '@angular/core';
import { loginI } from "../../Models/login.interface";
import { ResponseI } from "../../Models/response.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UsuarioI } from "../../Models/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios:UsuarioI[]=[];

  url:string ="http://localhost/Sistema_Heladeria_Backend/";
  constructor(private http:HttpClient) {
    this.usuarios = [];
  }

  //Ingresar//
  loginUsu(form:loginI):Observable<ResponseI>{
    let direccion = this.url + "auth/login";
    return this.http.post<ResponseI>(direccion,form);

  }

  //Listar Usuarios//
  getAllUser(lista:{}):Observable<ResponseI>{
    let direccion = this.url + "api/usuarios/usuariosLis" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header, params:lista});
  }

  //Listar por ID
  getUser(id:number):Observable<ResponseI>{
    let direccion = this.url + "api/usuarios/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }
 //Añadir
  postuser(formulario:any):Observable<ResponseI>{
    let direccion = this.url + "api/usuarios/create" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.post<ResponseI>(direccion,formulario,{headers : header});
  }

  //Editar
  putuser(formulario:any, id:number):Observable<ResponseI>{
    let direccion = this.url + "api/usuarios/update/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.put<ResponseI>(direccion,formulario,{headers : header});
  }
  //Eliminar
  deleteUsuario (idusu: number) : Observable<ResponseI> {
    let direccion = this.url + "api/usuarios/updateStatus/"+idusu;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.put<ResponseI>(direccion,idusu, {headers : header});
  }

  getToken() {
    return "" + localStorage.getItem('token');
  }
}
