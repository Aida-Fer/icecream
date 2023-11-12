import { Injectable } from '@angular/core';
import { ResponseI } from "../../Models/response.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {
url:string ="http://localhost/Sistema_Heladeria_Backend/";

  constructor(private http:HttpClient) { }

  getToken() {
    return "" + localStorage.getItem('token');
  }
  //Listar
  getAllIng(lista:{}):Observable<ResponseI>{
    let direccion = this.url + "api/ingredientes/listar" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header,params:lista});
  }
   //Listar por Estado
   getEst():Observable<ResponseI>{
    let direccion = this.url + "api/ingredientes/ingredientes" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

   //Añadir
   postIng(formulario:any):Observable<ResponseI>{
    let direccion = this.url + "api/ingredientes/create" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.post<ResponseI>(direccion,formulario,{headers : header});
  }

  //Listar por ID
  getIng(id:number):Observable<ResponseI>{
    let direccion = this.url + "api/ingredientes/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

  //Editar
  putIng(formulario:any, id:number):Observable<ResponseI>{
    let direccion = this.url + "api/ingredientes/update/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.put<ResponseI>(direccion,formulario,{headers : header});
  }

  //Eliminar
  deleteIng(idprov: number) : Observable<ResponseI> {
    let direccion = this.url + "api/ingredientes/updateStatus/"+idprov;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.put<ResponseI>(direccion,idprov, {headers : header});
  }
}
