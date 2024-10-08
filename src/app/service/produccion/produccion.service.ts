import { Injectable } from '@angular/core';
import { ResponseI } from "../../Models/response.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductoI } from "../../Models/producto.interface";

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {

  url: string = "http://localhost/Sistema_Heladeria_Backend/api/";
  constructor(private http: HttpClient) {
  }

  getToken() {
    return "" + localStorage.getItem('token');
  }

  postproduccion(formulario:any):Observable<ResponseI>{
    let direccion = this.url + "produccion/create" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.post<ResponseI>(direccion,formulario,{headers : header});
  }

  getsabor(id:string):Observable<ResponseI>{
    let direccion = this.url + "produccion/"+id ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

  getresumen():Observable<ResponseI>{
    let direccion = this.url + "produccion/resumen" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

  getsabores():Observable<ResponseI>{
    let direccion = this.url + "sabores/allreg" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

  getreport(param: any):Observable<any>{
    let direccion = this.url + "produccion/informe" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<any>(direccion,{headers : header, params: param});
  }

  getproduccion(lista:{}):Observable<ResponseI>{
    let direccion = this.url + "produccion/listar" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header, params:lista});
  }
  
}
