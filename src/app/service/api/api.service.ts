import { Injectable } from '@angular/core';
import { ResponseI } from "../../Models/response.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string ="http://localhost/Sistema_Heladeria_Backend/";
  constructor(private http:HttpClient) {
  }
  getToken() {
    return "" + localStorage.getItem('token');
  }

  getRol():Observable<ResponseI>{
    let direccion = this.url + "api/rol" ;
    const header = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
    return this.http.get<ResponseI>(direccion,{headers : header});
  }
}
