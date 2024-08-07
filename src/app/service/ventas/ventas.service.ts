import { Injectable } from '@angular/core';
import { loginI } from "../../Models/login.interface";
import { ResponseI } from "../../Models/response.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UsuarioI } from "../../Models/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  url:string ="http://localhost/Sistema_Heladeria_Backend/";
  constructor(private http:HttpClient) {
  }

  getventas(lista:{}):Observable<ResponseI>{
    let direccion = this.url + "api/ventas/listar" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header, params:lista});
  }

  getreport(lista:{}):Observable<any>{
    let direccion = this.url + "api/ventas/reporte" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<any>(direccion,{headers : header, params:lista});
  }

  getsabores():Observable<ResponseI>{
    let direccion = this.url + "api/sabores/allreg" ;
    // let direccion = this.url + "api/produccion/allprod" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

  getexits():Observable<ResponseI>{
    let direccion = this.url + "api/sabores/exist" ;
    // let direccion = this.url + "api/produccion/allprod" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

  getproducto():Observable<ResponseI>{
    let direccion = this.url + "api/productos/producto" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

  postventas(formulario:any, lista:any):Observable<ResponseI>{
    formulario.lista = lista;
    let direccion = this.url + "api/ventas/create" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.post<ResponseI>(direccion,formulario,{headers : header});
  }

  getToken() {
    return "" + localStorage.getItem('token');
  }
}
