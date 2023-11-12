import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/Models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url:string ="http://localhost/Sistema_Heladeria_Backend/";
  constructor(private http:HttpClient) {
  }
  getToken() {
    return "" + localStorage.getItem('token');
  }
  //Listar
  getClie(lista:{}):Observable<ResponseI>{
    let direccion = this.url + "api/clientes/listar" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header, params:lista});
  }

  //Añadir
  postClie(formulario:any):Observable<ResponseI>{
    let direccion = this.url + "api/clientes/create" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.post<ResponseI>(direccion,formulario,{headers : header});
  }
  //Listar por ID
  getClieID(id:number):Observable<ResponseI>{
    let direccion = this.url + "api/clientes/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }

  //Editar
  putClie(formulario:any, id:number):Observable<ResponseI>{
    let direccion = this.url + "api/clientes/update/"+id;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.put<ResponseI>(direccion,formulario,{headers : header});
  }

  //Eliminar
  deleteCliente (idclie: number) : Observable<ResponseI> {
    let direccion = this.url + "api/clientes/updateStatus/"+idclie;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.put<ResponseI>(direccion,idclie, {headers : header});
  }
}
