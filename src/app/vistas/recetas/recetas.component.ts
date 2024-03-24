import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { data } from 'jquery';

import { Subject } from 'rxjs';
import { SaboresI } from "src/app/Models/sabores.interface";
import { saboresService } from "src/app/service/sabores/sabores.service";
import { IngredientesService } from 'src/app/service/ingredientes/ingredientes.service';
import { IngredientesI } from 'src/app/Models/Ingredientes.interface';

@Component({
    selector: 'app-recetas',
    templateUrl: './recetas.component.html',
    styleUrls: ['./recetas.component.css']
})
export class RecetasComponent {
    funcion: number = 0;
    busqueda: string = '';
    page: number = 0;
    total: number = 0;
    length: number = 2;

    closeResult = '';
    opcionSeleccionado: number = 0;
    titulo: string = '';
    textoboton: string = '';
    lsingredientes: any[] = [];
    registerform!: FormGroup;
    idsabores: number = 0;
    submitted = false;

    lsing: IngredientesI[] = [];
    sabores: SaboresI[] = [];
    constructor(private formBuilder: FormBuilder, private activerouter: ActivatedRoute, private router: Router, private apiSab: saboresService, private apiIng: IngredientesService) { }
    //Formulario
    formulario = new FormGroup({
        sabor: new FormControl('', Validators.required),
        peso: new FormControl('', Validators.required),
        idsabor: new FormControl('', Validators.required),
        medida: new FormControl('', Validators.required)
    })
    ngOnInit(): void {
        this.listarIng();
        this.cargarlista();
    }
    //Listar Ingredientes
    listarIng() {
        this.titulo = 'Registrar Sabores';
        this.textoboton = 'Guardar';
        this.apiIng.getEst().subscribe(data => {
            console.log(data);
            this.lsing = data.result;
        })
    }

    mostrar(numero: number) {
        this.funcion = numero;
    }

    cambiar(opcion: any) {
        this.funcion = opcion;
        if (this.funcion != 0) {
            this.formulario.reset();
            this.lsingredientes = [];
            this.listarIng();
            this.cargarlista();
        }
    }

    mandardatos(formu: any) {
        if (this.idsabores == 0) {
            this.apiSab.postSab(formu, this.lsingredientes).subscribe(data => {
                if (data.status == 'OK') {
                    Swal.fire({
                        title: 'Mensaje de Confirmacion',
                        text: 'Sabor registrada correctamente',
                        icon: "success",
                        // background: '#CCBBFF'
                    });
                    this.formulario.reset();
                    this.cambiar(0);
                    this.cargarlista();
                }
            })
        } else {
            this.apiSab.putSab(formu, this.lsingredientes, this.idsabores).subscribe(data => {
                if (data.status == 'OK') {
                    Swal.fire({
                        title: 'Mensaje de Confirmacion',
                        text: 'Sabor actualizaco correctamente',
                        icon: "success",
                        // background: '#CCBBFF'
                    });
                    this.formulario.reset();
                    this.cambiar(0);
                    this.idsabores = 0;
                    this.cargarlista();
                }
            })
        }
    }

    cargar() {
        console.log(this.formulario.get('idsabor')!.value);
        var selectemp = this.lsing.find(x => x.idingredientes == Number(this.formulario.get('idsabor')!.value));
        var ing = this.lsingredientes.find(x => x.idingredientes == selectemp?.idingredientes);
        if (ing == null) {
            this.lsingredientes.push({ 'nombre': selectemp?.nombre, 'sabor': this.formulario.get('sabor')?.value, 'cantidad': this.formulario.get('medida')?.value, 'idingredientes': selectemp?.idingredientes });
            console.log(this.lsingredientes);        
        }else{
            Swal.fire("Mensaje de Advertencia","El ingrediente ya fue asignado a la tabla","warning");    
        }
    }

    cargarlista() {
        this.apiSab.getAllSab({ length: this.length, page: this.page, search: this.busqueda }).subscribe(data => {
            this.sabores = data.result;
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

    asignar($event: any) {
        this.titulo = 'Modificar Sabor';
        this.textoboton = 'Modificar';
        this.funcion = 1;
        this.idsabores = $event;
        this.apiSab.getSab($event).subscribe(data => {
            console.log(data);
            this.formulario.setValue({
                'sabor': data.result.sabor,
                'peso': data.result.peso,
                'idsabor': '0',
                'medida': '0'
            });
            this.lsingredientes = data.detalles;
        })
    }

    habilitar(id: number, sab: SaboresI) {
        Swal.fire({
            title: 'Esta seguro de habilitar el sabor: ' + sab.sabor + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4BB8F9',
            cancelButtonColor: '#EE80D2',
            confirmButtonText: 'Si, Confirmar!',
            // background: '#CCBBFF'
        }).then((result) => {
            if (result.isConfirmed) {
                //console.log(result);
                this.apiSab.deleteSab(id).subscribe(data => {
                    this.cargarlista();
                })
            }
        })
    }

    deshabilitar(id: number, sab: SaboresI) {
        Swal.fire({
            title: 'Esta seguro de deshabilitar el sabor: ' + sab.sabor + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4BB8F9',
            cancelButtonColor: '#EE80D2',
            confirmButtonText: 'Si, Confirmar!',
            // background: '#CCBBFF'
        }).then((result) => {
            if (result.isConfirmed) {
                //console.log(result);
                this.apiSab.deleteSab(id).subscribe(data => {
                    this.cargarlista();
                })
            }
        })
    }

    eliminar(indice: number) {
        this.lsingredientes.splice(indice, 1);
    }
}
