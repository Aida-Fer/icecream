import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

import { Subject } from 'rxjs';
import { IngredientesI } from "src/app/Models/Ingredientes.interface";
import { IngredientesService } from "src/app/service/ingredientes/ingredientes.service";

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent {
  funcion: number = 0;
  //search
  opcion: number = 0;
  busqueda: string = '';
  page: number = 0;
  total: number = 0;
  length: number = 2;
  lista: any[] = [];

  closeResult = '';
  titulo: string = '';
  textoboton: string = '';
  formulario!: FormGroup;
  idingredientes: number = 0;
  submitted = false;
  ingredientes: IngredientesI[] = [];

  constructor(private formBuilder: FormBuilder, private activerouter: ActivatedRoute, private router: Router, private apiIng: IngredientesService) { 
     //Formulario
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      medida: new FormControl('', Validators.required),
      unidad: new FormControl('', Validators.required),
      fecharealizado: new FormControl('', Validators.required)
      //estado: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.cargarlista();
  }
  //Listar
  cargarlista() {
    this.apiIng.getAllIng({ length: this.length, page: this.page, search: this.busqueda }).subscribe(data => {
      this.ingredientes = data.result;
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

  //Agregar
  cambiar(opcion: any) {
    this.funcion = opcion;
    if (this.funcion != 0) {
        this.formulario.reset();
        this.lista = [];
        this.cargarlista();
    }
  }
  //Agregar
  mostrar(numero: number) {
    this.funcion = numero;
    if (this.funcion == 0) {
        this.formulario.reset();
        this.lista = [];
        this.cargarlista();
    } else {
        this.titulo = 'Registro de Ingredientes';
        this.textoboton = 'Guardar';
        this.formulario.reset();
        //this.precarga();
    }
  }
  mandardatos(formu: any) {
    if (this.idingredientes == 0) {
        this.apiIng.postIng(formu).subscribe(data => {
            console.log(data)
            if (data.status == 'OK') {
                Swal.fire({
                    title: 'Mensaje de Confirmacion',
                    text: 'Ingrediente registrada correctamente',
                    icon: "success",
                    // background: '#CCBBFF'
                });
                this.formulario.reset();
                this.cambiar(0);
                this.cargarlista();
            }
        })
    } else {
        this.apiIng.putIng(formu, this.idingredientes).subscribe(data => {
            if (data.status == 'OK') {
                Swal.fire({
                    title: 'Mensaje de Confirmacion',
                    text: 'Ingrediente actualizado correctamente',
                    icon: "success",
                    // background: '#CCBBFF'
                });
                this.formulario.reset();
                this.cambiar(0);
                this.cargarlista();
            }
        })
    }
  }

  //Editar
  asignar($event: any) {
    this.titulo = 'Modificar Ingrediente';
    this.textoboton = 'Modificar';
    this.funcion = 1;
  this.idingredientes = $event;
    this.apiIng.getIng($event).subscribe(data => {
      console.log(data);
      this.formulario.setValue({
        nombre: data.result.nombre,
        medida: data.result.medida,
        unidad: data.result.unidad,
        fecharealizado: data.result.fecharealizado
      });
    })
  }
  habilitar(id: number, ing: IngredientesI) {
    Swal.fire({
      title: 'Esta seguro de habilitar el ingrediente: ' + ing.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4BB8F9',
      cancelButtonColor: '#EE80D2',
      confirmButtonText: 'Si, Confirmar!',
      // background: '#CCBBFF'
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(result);
        this.apiIng.deleteIng(id).subscribe(data => {
          this.cargarlista();
        })
      }
    })
  }
  deshabilitar(id: number, ing: IngredientesI) {
    Swal.fire({
      title: 'Esta seguro de deshabilitar el ingrediente: ' + ing.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4BB8F9',
      cancelButtonColor: '#EE80D2',
      confirmButtonText: 'Si, Confirmar!',
      // background: '#CCBBFF'
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(result);
        this.apiIng.deleteIng(id).subscribe(data => {
          this.cargarlista();
        })
      }
    })
  }
}
