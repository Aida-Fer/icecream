import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }

  isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  rol(num: string): boolean {
    return localStorage.getItem('rol') == num ? true : false;
  }

  salir(){
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }
}
