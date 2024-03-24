import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaI } from 'src/app/Models/persona.interface';
import { ClientesService } from 'src/app/service/clientes/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  funcion: number = 0;
  //search
  busqueda: string = '';
  idseleccionado: number = 0;
  opcionSeleccionado: number = 0;
  page: number = 0;
  total: number = 0;
  totalvalor: number = 0;
  lista: any[] = [];
  length: number = 2;

  titulo: string = '';
  textoboton: string = '';
  formulario!: FormGroup;

  lsclie: PersonaI[] = [];
  lshistorial: any[] = [];
  idclientes: number = 0;

  totalmodal: number = 0;
  pagemodal: number = 0;
  searchmodal: string = '';
  idmodal: number = 0;

  constructor(private api: ClientesService) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      appaterno: new FormControl('', Validators.required),
      apmaterno: new FormControl('', Validators.required),
      fechanac: new FormControl('', Validators.required),
      ci: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
    })
  }
  ngOnInit(): void {
    this.cargarlista();
  }
  //Listar
  cargarlista() {
    this.api.getClie({ length: this.length, page: this.page, search: this.busqueda }).subscribe(data => {
      this.lista = data.result;
      this.total = data.paginas;
    })
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  cambiarpagina(num: number) {
    this.page = num;
    this.cargarlista();
  }

  cambiarpaginamodal(num: number) {
    this.pagemodal = num;
    this.cargarhistorial(this.idmodal);
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
      this.titulo = 'Registro de Clientes';
      this.textoboton = 'Guardar';
      this.formulario.reset();
      //this.precarga();
    }
  }
  mandardatos(formu: any) {
    if (this.idclientes == 0) {
      this.api.postClie(formu).subscribe(data => {
        console.log(data)
        if (data.status == 'OK') {
          Swal.fire({
            title: 'Mensaje de Confirmacion',
            text: 'Cliente registrada correctamente',
            icon: "success",
            // background: '#CCBBFF'
          });
          this.formulario.reset();
          this.cambiar(0);
          this.cargarlista();
        }
      })
    } else {
      this.api.putClie(formu, this.idclientes).subscribe(data => {
        if (data.status == 'OK') {
          Swal.fire({
            title: 'Mensaje de Confirmacion',
            text: 'Cliente actualizado correctamente',
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

  //Modificar
  asignar($event: any) {
    this.titulo = 'Modificar Cliente';
    this.textoboton = 'Modificar';
    this.funcion = 1;
    this.idclientes = $event;
    this.api.getClieID($event).subscribe(data => {
      console.log(data);
      this.formulario.setValue({
        nombre: data.result.nombre,
        apmaterno: data.result.apmaterno,
        appaterno: data.result.appaterno,
        fechanac: data.result.fechanac,
        ci: data.result.ci,
        direccion: data.result.direccion,
        telefono: data.result.telefono,
      });
      this.lista = data.detalles;
    })
  }

  habilitar(id: number, clie: PersonaI) {
    Swal.fire({
      title: 'Esta seguro de habilitar al cliente: ' + clie.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4BB8F9',
      cancelButtonColor: '#EE80D2',
      confirmButtonText: 'Si, Confirmar!',
      // background: '#CCBBFF'
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(result);
        this.api.deleteCliente(id).subscribe(data => {
          this.cargarlista();
        })
      }
    })
  }

  deshabilitar(id: number, clie: PersonaI) {
    Swal.fire({
      title: 'Esta seguro de deshabilitar al cliente: ' + clie.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4BB8F9',
      cancelButtonColor: '#EE80D2',
      confirmButtonText: 'Si, Confirmar!',
      // background: '#CCBBFF'
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(result);
        this.api.deleteCliente(id).subscribe(data => {
          this.cargarlista();
        })
      }
    })
  }

  cargarhistorial(id: number) {
    this.idmodal = id;
    this.api.gethistorial({ length: 5, page: this.pagemodal, search: this.busqueda , id: id}).subscribe(data => {
      this.lshistorial = data.result;
      this.totalmodal = data.paginas;
    })
  }
}
