import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from "../../service/usuarios/usuario.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2'
// Modelos
import { UsuarioI } from "../../Models/usuario.interface";
import { ApiService } from 'src/app/service/api/api.service';
import { RolI } from 'src/app/Models/rol.interface';
import { Subject } from 'rxjs';
import { Select2Option, Select2UpdateEvent } from 'ng-select2-component';


declare var $: any;

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
    funcion: number = 0;
    //search
    opcion = 0;
    lsusuarios: UsuarioI[] = [];
    busqueda: string = '';
    page: number = 0;
    total: number = 0;
    lista: any[] = [];
    length: number = 2;

    closeResult = '';
    titulo : string = '';
    textoboton:string = '';
    formulario!: FormGroup;
    idusuario: number = 0;
    submitted = false;

    lsrol: RolI[] = [];
    usuarios: UsuarioI[] = [];
    constructor(private formBuilder: FormBuilder, private apiusuario: UsuarioService, private activerouter: ActivatedRoute, private router: Router, private api: ApiService) {
      this.formulario = new FormGroup({
        nombre: new FormControl('', Validators.required),
            appaterno: new FormControl('', Validators.required),
            apmaterno: new FormControl('', Validators.required),
            fechanac: new FormControl('', Validators.required),
            ci: new FormControl('', Validators.required),
            direccion: new FormControl('', Validators.required),
            telefono: new FormControl('', Validators.required),
            usuario: new FormControl('', Validators.required),
            contraseña: new FormControl('', Validators.required),
            horaentrada: new FormControl('', Validators.required),
            horasalida: new FormControl('', Validators.required),
            Salario: new FormControl('', Validators.required),
            idrol: new FormControl('', Validators.required)
      })
    }

    ngOnInit(): void {
        this.cargarlista();
        this.listarrol();
    }
    //Listar
    cargarlista() {
      this.apiusuario.getAllUser({length: this.length, page: this.page, search: this.busqueda }).subscribe(data => {
        this.lsusuarios = data.result;
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

    listarrol() {
        this.api.getRol().subscribe(data => {
            console.log(data);
            this.lsrol = data.result;
        })
    }
    cambiar(opcion: any) {
      this.funcion = opcion;
      if (this.funcion != 0) {
          this.formulario.reset();
          this.lista = [];
          // this.listarIng();
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
        this.titulo = 'Registro de Usuario';
        this.textoboton = 'Guardar';
        this.formulario.reset();
        //this.precarga();
    }
  }
  mandardatos(formu: any) {
    if (this.idusuario == 0) {
        this.apiusuario.postuser(formu).subscribe(data => {
            console.log(data)
              if (data.status == 'OK') {
                  Swal.fire({
                      title: 'Mensaje de Confirmacion',
                      text: 'Usuario registrada correctamente',
                      icon: "success",
                      // background: '#CCBBFF'
                  });
                  this.formulario.reset();
                  this.cambiar(0);
                  this.cargarlista();
              }
          })
      } else {
          this.apiusuario.putuser(formu, this.idusuario).subscribe(data => {
              if (data.status == 'OK') {
                  Swal.fire({
                      title: 'Mensaje de Confirmacion',
                      text: 'Usuario actualizado correctamente',
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
      this.titulo = 'Modificar Usuario';
      this.textoboton = 'Modificar';
      this.funcion = 1;
      this.idusuario = $event;
      this.apiusuario.getUser($event).subscribe(data => {
          console.log(data);
          this.formulario.setValue({
              nombre : data.result.nombre,
              apmaterno : data.result.apmaterno,
              appaterno : data.result.appaterno,
              fechanac : data.result.fechanac,
              ci : data.result.ci,
              direccion : data.result.direccion,
              telefono : data.result.telefono,
              usuario : data.result.usuario,
              contraseña : '',
              horaentrada : data.result.horaentrada,
              horasalida : data.result.horasalida,
              Salario : data.result.Salario,
              idrol : data.result.idrol
          });
      })
    }
    
    habilitar(id: number, user:UsuarioI){
      Swal.fire({
        title: 'Esta seguro de habilitar al usuario: '+user.usuario+'?',
        text: "Una vez realizado esto el usuario tendra acceso al sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4BB8F9',
        cancelButtonColor: '#EE80D2',
        confirmButtonText: 'Si, Confirmar!',
        // background: '#CCBBFF'
      }).then((result) => {
        if (result.isConfirmed) {
          //console.log(result);
          this.apiusuario.deleteUsuario(id).subscribe(data => {
            this.cargarlista();
          })
        }
      })
    }
    deshabilitar(id: number, user:UsuarioI){
      Swal.fire({
        title: 'Esta seguro de deshabilitar al usuario: '+user.usuario+'?',
        text: "Una vez realizado esto el usuario no tendra acceso al sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4BB8F9',
        cancelButtonColor: '#EE80D2',
        confirmButtonText: 'Si, Confirmar!',
        // background: '#CCBBFF'
      }).then((result) => {
        if (result.isConfirmed) {
          //console.log(result);
          this.apiusuario.deleteUsuario(id).subscribe(data => {
            this.cargarlista();
          })
        }
      })
    }
}
