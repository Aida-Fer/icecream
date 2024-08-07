import { Component } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

import { Subject } from 'rxjs';
import { ProveedorI } from "src/app/Models/Proveedores.interface";
import { ProveedorService } from "src/app/service/proveedor/proveedor.service";

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  funcion: number = 0;
  //search
  opcion: number = 0;
  busqueda: string = '';
  page: number = 0;
  total: number = 0;
  length: number = 2;

  lista: any[] = [];

  closeResult = '';
  titulo : string = '';
  textoboton:string = '';
  formulario!: FormGroup;
  idproveedor: number = 0;
  submitted = false;
  proveedores: ProveedorI[] = [];

  constructor(private formBuilder: FormBuilder, private activerouter: ActivatedRoute, private router: Router, private apiProv: ProveedorService) { 
     //Formulario
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      appaterno: new FormControl('', Validators.required),
      apmaterno: new FormControl('', Validators.required),
      fechanac: new FormControl('', Validators.required),
      ci: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required)
    //estado: new FormControl('', Validators.required)
})
  }  
    ngOnInit(): void {
    this.cargarlista();
    }

  //Listar
  cargarlista() {
    this.apiProv.getAllProv({length: this.length, page: this.page, search: this.busqueda }).subscribe(data => {
      console.log(data);
      this.proveedores = data.result;
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
        this.titulo = 'Registro de Proveedor';
        this.textoboton = 'Guardar';
        this.formulario.reset();
        //this.precarga();
    }
  }
  mandardatos(formu: any) {
    if (this.idproveedor == 0) {
        this.apiProv.postProv(formu).subscribe(data => {
            console.log(data)
            if (data.status == 'OK') {
                Swal.fire({
                    title: 'Mensaje de Confirmacion',
                    text: 'Proveedor registrada correctamente',
                    icon: "success",
                    // background: '#CCBBFF'
                });
                this.formulario.reset();
                this.cambiar(0);
                this.cargarlista();
            }else{
              Swal.fire({
                  title: 'error',
                  html: data.mensaje,
                  icon: "error",
              });
            }
        })
    } else {
        this.apiProv.putProv(formu, this.idproveedor).subscribe(data => {
            if (data.status == 'OK') {
                Swal.fire({
                    title: 'Mensaje de Confirmacion',
                    text: 'Proveedor actualizado correctamente',
                    icon: "success",
                    // background: '#CCBBFF'
                });
                this.formulario.reset();
                this.cambiar(0);
                this.cargarlista();
            }else{
              Swal.fire({
                  title: 'error',
                  html: data.mensaje,
                  icon: "error",
              });
            }
        })
    }
  }

   //Editar
   asignar($event: any) {
    this.titulo = 'Modificar Proveedor';
    this.textoboton = 'Modificar';
    this.funcion = 1;
    this.idproveedor = $event;
    this.apiProv.getProv($event).subscribe(data => {
        console.log(data);
        this.formulario.setValue({
          nombre : data.result.nombre,
          apmaterno : data.result.apmaterno,
          appaterno : data.result.appaterno,
          fechanac : data.result.fechanac,
          ci : data.result.ci,
          direccion : data.result.direccion,
          telefono : data.result.telefono
      });
    })
  }
  

  habilitar(id: number, prov:ProveedorI){
    Swal.fire({
      title: 'Esta seguro de habilitar al proveedor: '+prov.Proveedor+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4BB8F9',
      cancelButtonColor: '#EE80D2',
      confirmButtonText: 'Si, Confirmar!',
      // background: '#CCBBFF'
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(result);
        this.apiProv.deleteProv(id).subscribe(data => {
          this.cargarlista();
        })
      }
    })
  }
  deshabilitar(id: number, prov:ProveedorI){
    Swal.fire({
      title: 'Esta seguro de deshabilitar al proveedor: '+prov.Proveedor+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4BB8F9',
      cancelButtonColor: '#EE80D2',
      confirmButtonText: 'Si, Confirmar!',
      // background: '#CCBBFF'
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(result);
        this.apiProv.deleteProv(id).subscribe(data => {
          this.cargarlista();
        })
      }
    })
  }


}
