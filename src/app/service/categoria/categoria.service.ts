import { Injectable } from '@angular/core';
import { ResponseI } from "../../Models/response.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url:string ="http://localhost/Sistema_Heladeria_Backend/";
  constructor(private http:HttpClient) {
  }
  getToken() {
    return "" + localStorage.getItem('token');
  }
  //Listar
  getCat(lista:{}):Observable<ResponseI>{
    let direccion = this.url + "api/categorias/listar" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header, params:lista});
  }
  //Listar
  getCatAct():Observable<ResponseI>{
    let direccion = this.url + "api/categorias/categoriasList" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

   //Añadir
   postCat(formulario:any):Observable<ResponseI>{
    let direccion = this.url + "api/categorias/create" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.post<ResponseI>(direccion,formulario,{headers : header});
  }

  //Listar por ID
  getCatID(id:number):Observable<ResponseI>{
    let direccion = this.url + "api/categorias/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

  //Editar
  putCat(formulario:any, id:number):Observable<ResponseI>{
    let direccion = this.url + "api/categorias/update/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.put<ResponseI>(direccion,formulario,{headers : header});
  }

  //Eliminar
  deleteCategoria (idcat: number) : Observable<ResponseI> {
    let direccion = this.url + "api/categorias/updateStatus/"+idcat;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.put<ResponseI>(direccion,idcat, {headers : header});
  }
}
