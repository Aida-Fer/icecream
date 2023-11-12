import { Injectable } from '@angular/core';
import { ResponseI } from "../../Models/response.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductoI } from "../../Models/producto.interface";


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private productos:ProductoI[]=[];

  url:string ="http://localhost/Sistema_Heladeria_Backend/";
  constructor(private http:HttpClient) {
    this.productos = [];
  }

  //Listar Usuarios//
  getAllProd(lista:{}):Observable<ResponseI>{
    let direccion = this.url + "api/productos/productosLis" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header, params:lista});
  }

  //Token
  getToken() {
    return "" + localStorage.getItem('token');
  }

  //Añadir
  postprod(formulario:any):Observable<ResponseI>{
    let direccion = this.url + "api/productos/create" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.post<ResponseI>(direccion,formulario,{headers : header});
  }

  //Listar por ID
  getProd(id:number):Observable<ResponseI>{
    let direccion = this.url + "api/productos/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

  //Editar
  putProd(formulario:any, id:number):Observable<ResponseI>{
    let direccion = this.url + "api/productos/update/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.put<ResponseI>(direccion,formulario,{headers : header});
  }
}
