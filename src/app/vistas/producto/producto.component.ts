import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from "../../service/producto/producto.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2'

// Modelos
import { ProductoI } from 'src/app/Models/producto.interface';
import { ResponseI } from "../../Models/response.interface"
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { CategoriaI } from 'src/app/Models/categoria.interface';
import { Subject } from 'rxjs';





@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
    funcion: number = 0;
    //search
    opcion : number = 0;
    busqueda: string = '';
    page: number = 0;
    total: number = 0;
    length: number = 2;
    lista: any[] = [];

    closeResult = '';
    titulo : string = '';
    textoboton:string = '';
    registerform!: FormGroup;
    idproducto: number = 0;
    submitted = false;
    lscat: CategoriaI[] = [];
    productos: ProductoI[] = [];

    constructor(private formBuilder: FormBuilder, private apiproducto: ProductoService, private activerouter: ActivatedRoute, private router: Router, private api: CategoriaService) {
      //Formulario
      this.registerform = this.formBuilder.group({
        nombre       : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]],
        nroporcion   : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(11), Validators.pattern(/^[0-9]\d*$/)]],
        costobase    : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/)]],
        idcategoria  : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
        precio  : ['', [Validators.required]]
      });

     }
          
    ngOnInit(): void {
    this.cargarlista();
    this.listarcat();
    }

    get f() { return this.registerform.controls;}

    cargarlista() {
      this.apiproducto.getAllProd({length: this.length, page: this.page, search: this.busqueda }).subscribe(data => {
        this.productos = data.result;
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
    listarcat() {
      this.api.getCatAct().subscribe(data => {
          //console.log(data);
          this.lscat = data.result;
      })
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
        this.titulo = 'Registro de Producto';
        this.textoboton = 'Guardar';
        this.registerform.reset();
        //this.precarga();
    }
  }

  mandardatos(formu: any) {
    if (this.idproducto == 0) {
        this.apiproducto.postprod(formu).subscribe(data => {
            console.log(data)
            if (data.status == 'OK') {
                Swal.fire({
                    title: 'Mensaje de Confirmacion',
                    text: 'Producto registrado correctamente',
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
        this.apiproducto.putProd(formu, this.idproducto).subscribe(data => {
            if (data.status == 'OK') {
                Swal.fire({
                    title: 'Mensaje de Confirmacion',
                    text: 'Producto actualizado correctamente',
                    icon: "success",
                    // background: '#CCBBFF'
                });
                this.registerform.reset();
                this.cambiar(0);
                this.cargarlista();
            }else{
              Swal.fire({
                  title: 'Error '+data.result,
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
    this.titulo = 'Modificar Producto';
    this.textoboton = 'Modificar';
    this.funcion = 1;
  this.idproducto = $event;
    this.apiproducto.getProd($event).subscribe(data => {
        console.log(data);
        this.registerform.setValue({
            nombre : data.result.nombre,
            nroporcion : data.result.nroporcion,
            costobase : data.result.costobase,
            precio: data.result.precio,
            idcategoria : data.result.idcategoria
        });
    })
  }
}
