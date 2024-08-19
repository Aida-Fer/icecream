import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientesI } from 'src/app/Models/Ingredientes.interface';
import { ProveedorI } from 'src/app/Models/Proveedores.interface';
import { SaboresI } from 'src/app/Models/sabores.interface';
import { IngresosService } from 'src/app/service/ingresos/ingresos.service';
import { ProduccionService } from 'src/app/service/produccion/produccion.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-produccion',
    templateUrl: './produccion.component.html',
    styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent implements OnInit {
    funcion: number = 0;
    busqueda: string = '';
    idseleccionado: number = 0;
    opcionSeleccionado: number = 0;
    page: number = 0;
    total: number = 0;
    totalvalor: number = 0;
    lista: any = [];
    length: number = 2;

    titulo: string = '';
    textoboton: string = '';
    lsabores: SaboresI[] = [];
    lsingreso: any = [];
    formulario!: FormGroup;

    lsing: IngredientesI[] = [];
    constructor(private api: ProduccionService) {
        this.formulario = new FormGroup({
            idreceta: new FormControl('', Validators.required),
            fechavenc: new FormControl('', Validators.required),
            cantidad: new FormControl('', Validators.required),
            unidad: new FormControl('', Validators.required),
        })
    }

    ngOnInit(): void {
        this.cargarlista();
    }

    mostrar(numero: number) {
        this.funcion = numero;
        if (this.funcion == 0) {
            this.formulario.reset();
            this.lista = [];
            this.cargarlista();
        } else {
            this.titulo = 'Registro de Ingreso';
            this.textoboton = 'registrar';
            this.formulario.reset();
            this.precarga();
        }
    }

    precarga() {
        this.api.getsabores().subscribe(data => {
            this.lsabores = data.result;
            console.log(data);
        });
        // this.api.getAllingredientes().subscribe(data => {
        //     this.lsing = data.result;
        //     console.log(data);
        // });
    }

    cargar() {
        console.log(this.opcionSeleccionado);
        var selectemp = this.lsing.find(x => x.idingredientes == this.opcionSeleccionado)
        this.lsingreso.push({ 'nombre': selectemp?.nombre, 'cantidad': this.formulario.get('unidades')?.value, 'idingredientes': selectemp?.idingredientes, 'fechavec': this.formulario.get('fechavec')?.value, 'CostoU': this.formulario.get('costo')?.value });
        console.log(this.lsingreso);
        this.totalvalor = Number(this.totalvalor) + Number(this.formulario.get('costo')?.value * this.formulario.get('unidades')?.value)
    }

    cargarlista() {
        this.api.getproduccion({ length: this.length, page: this.page, search: this.busqueda }).subscribe(data => {
            this.lista = data.result;
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

    asignar(id: number) {
        this.precarga();
        this.titulo = 'Modificar Sabor';
        this.textoboton = 'Modificar';
        this.funcion = 1;
        this.idseleccionado = id;
        // this.api.getsabor(''+id).subscribe(data => {
        //     this.formulario.controls['idreceta'].setValue(data.result.idreceta)
        //     this.formulario.controls['fechavenc'].setValue(data.result.fechavenc)
        //     this.formulario.controls['cantidad'].setValue(data.result.cantidad)
        // })
    }

    mandardatos(formu: any) {
        if (this.idseleccionado == 0) {
            console.log(formu)
            this.api.postproduccion(formu).subscribe(data => {
                console.log(data)
                if (data.status == 'OK') {
                    Swal.fire({
                        title: data.result,
                        text: data.mensaje,
                        icon: "success",
                        background: '#CCBBFF'
                    });
                    this.formulario.reset();
                }else {
                    Swal.fire({
                        title: "error",
                        text: data.mensaje,
                        icon: "error",
                        background: '#CCBBFF'
                    });
                }
            })
        } else {
            // this.api.putIng(formu, this.lsingreso, this.idseleccionado).subscribe(data => {
            //     if (data.status == 'OK') {
            //         Swal.fire({
            //             title: 'Mensaje de Confirmacion',
            //             text: 'Sabor actualizaco correctamente',
            //             icon: "success",
            //             background: '#CCBBFF'
            //         });
            //         this.mostrar(0);
            //         this.formulario.reset();
            //         this.idseleccionado = 0;
            //     }
            // })
        }
    }

    eliminar(id: number) {
        this.lsingreso.splice(id, 1);
    }
}
