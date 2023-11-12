import { Injectable } from '@angular/core';
import { ResponseI } from "../../Models/response.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class saboresService {
  url:string ="http://localhost/Sistema_Heladeria_Backend/api/";

    constructor(private http:HttpClient) { }

    getToken() {
      return "" + localStorage.getItem('token');
    }
    //Listar
    getAllSab(lista:{}):Observable<ResponseI>{
      let direccion = this.url + "sabores/recetas" ;
      const header = new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
      return this.http.get<ResponseI>(direccion,{headers : header,params:lista});
    }

     //Añadir
     postSab(formulario:any, lista:any):Observable<ResponseI>{
      let direccion = this.url + "sabores/create" ;
      const header = new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
      formulario.lista = lista;
      return this.http.post<ResponseI>(direccion,formulario,{headers : header});
    }

    //Listar por ID
    getSab(id:number):Observable<ResponseI>{
      let direccion = this.url + "sabores/"+id;
      const header = new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
      return this.http.get<ResponseI>(direccion,{headers : header});
    }

    //Editar
    putSab(formulario:any, lista: any, id:number):Observable<ResponseI>{
      let direccion = this.url + "sabores/update/"+id;
      formulario.lista = lista;
      const header = new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
      return this.http.put<ResponseI>(direccion,formulario,{headers : header});
    }

    //Eliminar
    deleteSab(idprov: number) : Observable<ResponseI> {
      let direccion = this.url + "sabores/updateStatus/"+idprov;
      const header = new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
      return this.http.put<ResponseI>(direccion,idprov, {headers : header});
    }
  }

