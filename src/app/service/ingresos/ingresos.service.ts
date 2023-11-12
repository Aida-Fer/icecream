import { Injectable } from '@angular/core';
import { ResponseI } from "../../Models/response.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  url: string = "http://localhost/Sistema_Heladeria_Backend/";

  constructor(private http: HttpClient) { }

  getToken() {
    return "" + localStorage.getItem('token');
  }

  getingresos(lista:{}): Observable<ResponseI> {
    let direccion = this.url + "api/ingresos/listar";
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion, { headers: header, params: lista });
  }

  getingredientes(): Observable<ResponseI> {
    let direccion = this.url + "api/ingresos/stock";
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion, { headers: header });
  }

  getIngreso(id:number):Observable<ResponseI>{
    let direccion = this.url + "api/ingresos/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

  putIng(formulario:any, lista:[], id:number):Observable<ResponseI>{
    let direccion = this.url + "api/ingresos/update/"+id;
    formulario.lista = lista;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.put<ResponseI>(direccion,formulario,{headers : header});
  }

  getAllProv(): Observable<ResponseI> {
    let direccion = this.url + "api/proveedores/proveedores";
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion, { headers: header });
  }

  getAllingredientes(): Observable<ResponseI> {
    let direccion = this.url + "api/ingredientes/ingredientes";
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion, { headers: header });
  }

  postingresos(formulario: any, lista: []): Observable<ResponseI> {
    formulario.lista = lista;
    let direccion = this.url + "api/ingresos/create";
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.post<ResponseI>(direccion, formulario, { headers: header });
  }
}
