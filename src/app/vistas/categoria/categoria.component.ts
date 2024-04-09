import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

import { Subject } from 'rxjs';
import { CategoriaI } from 'src/app/Models/categoria.interface';
import { CategoriaService } from 'src/app/service/categoria/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  //search
  busqueda: string = '';
  page: number = 0;
  total: number = 0;
  length: number = 2;

  //Cambiar
  funcion: number = 0;
  lista: any[] = [];

  closeResult = '';
  titulo : string = '';
  textoboton:string = '';
  registerform!: FormGroup;
  idcategoria: number = 0;
  submitted = false;

  categorias: CategoriaI[] = [];


  constructor(private formBuilder: FormBuilder, private activerouter: ActivatedRoute, private router: Router, private apiCategoria: CategoriaService) { }

    ngOnInit(): void {
      //Formulario
      this.registerform = this.formBuilder.group({
        nombre   : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]],
      });
      //Listar Producto
      this.cargarlista();
    }
    //Validaciones
    get f() { return this.registerform.controls;}
  //Listar
  cargarlista() {
    this.apiCategoria.getCat({length: this.length, page: this.page, search: this.busqueda }).subscribe(data => {
      this.categorias = data.result;
      this.total = data.paginas;
      console.log(data);
    })
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  cambiarpagina(num: number) {
    this.page = num;
    this.cargarlista();
  }

  cambiar(opcion: any) {
    this.funcion = opcion;
    if (this.funcion != 0) {
        this.registerform.reset();
        this.lista = [];
        this.cargarlista();
    }
  }
  //Agregar
  mostrar(numero: number) {
    this.funcion = numero;
    if (this.funcion == 0) {
        this.registerform.reset();
        this.lista = [];
        this.cargarlista();
    } else {
        this.titulo = 'Registro de Categoría';
        this.textoboton = 'registrar';
        this.registerform.reset();
        //this.precarga();
    }
  }
  mandardatos(formu: any) {
    if (this.idcategoria == 0) {
        this.apiCategoria.postCat(formu).subscribe(data => {
            console.log(data)
            if (data.status == 'OK') {
                Swal.fire({
                    title: 'Mensaje de Confirmacion',
                    text: 'Categoria registrada correctamente',
                    icon: "success",
                    // background: '#CCBBFF'
                });
                this.registerform.reset();
                this.cambiar(0);
                this.cargarlista();
            }else{
              Swal.fire({
                  title: 'Error',
                  html: data.mensaje,
                  icon: 'error',
                  confirmButtonText: 'OK'
              })
          }
        })
    } else {
        this.apiCategoria.putCat(formu, this.idcategoria).subscribe(data => {
            if (data.status == 'OK') {
                Swal.fire({
                    title: 'Mensaje de Confirmacion',
                    text: 'Categoria actualizada correctamente',
                    icon: "success",
                    // background: '#CCBBFF'
                });
                this.registerform.reset();
                this.cambiar(0);
                this.cargarlista();
            }else{
              Swal.fire({
                  title: 'Error',
                  html: data.mensaje,
                  icon: 'error',
                  confirmButtonText: 'OK'
              })
          }
        })
    }
  }

  //Editar
  asignar($event: any) {
    this.titulo = 'Modificar Categoria';
    this.textoboton = 'Modificar';
    this.funcion = 1;
  this.idcategoria = $event;
    this.apiCategoria.getCatID($event).subscribe(data => {
        console.log(data);
        this.registerform.setValue({
            nombre : data.result.nombre
        });
    })
  }

  //habilitar
  habilitar(id: number, cat:CategoriaI){
    Swal.fire({
      title: '<b> Esta seguro de habilitar la categoria: '+cat.nombre+'? </b>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4BB8F9',
      cancelButtonColor: '#EE80D2',
      confirmButtonText: 'Si, Confirmar!',
      // background:'rgba(3,169,244,0.3)'
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(result);
        this.apiCategoria.deleteCategoria(id).subscribe(data => {
          this.cargarlista();
        })
      }
    })
  }
  //Deshabilitar
  deshabilitar(id: number, cat:CategoriaI){
    Swal.fire({
      title: '<b> Esta seguro de deshabilitar la categoria: '+cat.nombre+'? </b>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4BB8F9',
      cancelButtonColor: '#EE80D2',
      confirmButtonText: 'Si, Confirmar!',
      // background:'rgba(3,169,244,0.3)'
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(result);
        this.apiCategoria.deleteCategoria(id).subscribe(data => {
          this.cargarlista();
        })
      }
    })
  }

}
