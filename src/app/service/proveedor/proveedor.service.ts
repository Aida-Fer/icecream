import { Injectable } from '@angular/core';
import { ResponseI } from "../../Models/response.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  url:string ="http://localhost/Sistema_Heladeria_Backend/";

  constructor(private http:HttpClient) { }

  getToken() {
    return "" + localStorage.getItem('token');
  }
  //Listar
  getAllProv(lista:{}):Observable<ResponseI>{
    let direccion = this.url + "api/proveedores/proveedoresList" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header,params:lista});
  }

   //Añadir
   postProv(formulario:any):Observable<ResponseI>{
    let direccion = this.url + "api/proveedores/create" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.post<ResponseI>(direccion,formulario,{headers : header});
  }

  //Listar por ID
  getProv(id:number):Observable<ResponseI>{
    let direccion = this.url + "api/proveedores/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

  //Editar
  putProv(formulario:any, id:number):Observable<ResponseI>{
    let direccion = this.url + "api/proveedores/update/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.put<ResponseI>(direccion,formulario,{headers : header});
  }

  //Eliminar
  deleteProv (idprov: number) : Observable<ResponseI> {
    let direccion = this.url + "api/proveedores/updateStatus/"+idprov;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.put<ResponseI>(direccion,idprov, {headers : header});
  }
}
