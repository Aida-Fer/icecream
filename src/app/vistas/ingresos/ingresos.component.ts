import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientesI } from 'src/app/Models/Ingredientes.interface';
import { ProveedorI } from 'src/app/Models/Proveedores.interface';
import { SaboresI } from 'src/app/Models/sabores.interface';
import { IngresosService } from 'src/app/service/ingresos/ingresos.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-ingresos',
    templateUrl: './ingresos.component.html',
    styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit{
    funcion: number = 0;
    busqueda: string = '';
    idseleccionado: number = 0;
    opcionSeleccionado:number = 0;
    page: number = 0;
    total: number = 0;
    totalvalor: number = 0;
    lista: any = [];
    length: number = 2;

    titulo: string = '';
    textoboton: string = '';
    lsprovee: ProveedorI[] = [];
    lsingreso: any = [];
    formulario!: FormGroup;

    lsing: IngredientesI[] = [];
    constructor(private api:IngresosService) {
        this.formulario = new FormGroup({
            idproveedor: new FormControl('', Validators.required),
            fecha: new FormControl('', Validators.required),
            total: new FormControl('0', Validators.required),
            ingredientes: new FormControl('', Validators.required),
            fechavec: new FormControl('', Validators.required),
            unidades: new FormControl('0', Validators.required),
            costo: new FormControl('0', Validators.required)
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

    precarga(){
        this.api.getAllProv().subscribe(data => {
            this.lsprovee = data.result;
            console.log(data);
        });
        this.api.getAllingredientes().subscribe(data => {
            this.lsing = data.result;
            console.log(data);
        });
    }

    cargar() {
        console.log(this.opcionSeleccionado);
        var selectemp = this.lsing.find(x => x.idingredientes == this.opcionSeleccionado)
        this.lsingreso.push({ 'nombre': selectemp?.nombre, 'cantidad': this.formulario.get('unidades')?.value, 'idingredientes': selectemp?.idingredientes, 'fechavec': this.formulario.get('fechavec')?.value, 'CostoU': this.formulario.get('costo')?.value });
        console.log(this.lsingreso);
        this.totalvalor = Number(this.totalvalor) + Number(this.formulario.get('costo')?.value * this.formulario.get('unidades')?.value)
    }

    cargarlista() {
        this.api.getingresos({ length: this.length, page: this.page, search: this.busqueda }).subscribe(data => {
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
        this.api.getIngreso(id).subscribe(data => {
            this.formulario.setValue({
                'idproveedor': data.result.idproveedor,
                'fecha': data.result.fecha,
                'total': data.result.total,
                'ingredientes': '',
                'fechavec': '',
                'unidades': '',
                'costo': ''
            });
            this.lsingreso = data.detalles;
        })
    }

    mandardatos(formu: any) {
        if (this.idseleccionado == 0) {
            this.api.postingresos(formu, this.lsingreso).subscribe(data => {
                console.log(data)
                if (data.status == 'OK') {
                    Swal.fire({
                        title: data.result,
                        text: data.mensaje,
                        icon: "success",
                        // background: '#CCBBFF'
                    });
                    this.formulario.reset();
                    this.lsingreso = [];
                }
            })
        } else {
            this.api.putIng(formu, this.lsingreso, this.idseleccionado).subscribe(data => {
                if (data.status == 'OK') {
                    Swal.fire({
                        title: 'Mensaje de Confirmacion',
                        text: 'Sabor actualizaco correctamente',
                        icon: "success",
                        background: '#CCBBFF'
                    });
                    this.mostrar(0);
                    this.formulario.reset();
                    this.idseleccionado = 0;
                }
            })
        }
    }

    eliminar(id:number){
        this.totalvalor = this.totalvalor - this.lsingreso[id].cantidad * this.lsingreso[id].CostoU;
        this.lsingreso.splice(id,1);
    }
}
