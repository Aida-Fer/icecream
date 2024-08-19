import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngredientesI } from 'src/app/Models/Ingredientes.interface';
import { ProveedorI } from 'src/app/Models/Proveedores.interface';
import { SaboresI } from 'src/app/Models/sabores.interface';
import { ClientesService } from 'src/app/service/clientes/clientes.service';
import { IngresosService } from 'src/app/service/ingresos/ingresos.service';
import { VentasService } from 'src/app/service/ventas/ventas.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-ventas',
    templateUrl: './ventas.component.html',
    styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
    display: string = '';
    funcion: number = 0;
    unidadestemp: number = 0;
    busqueda: string = '';
    idseleccionado: number = 0;
    opcionSeleccionado: number = 0;
    opcionproducto: number = 0;
    page: number = 0;
    total: number = 0;
    totalvalor: number = 0;
    lista: any = [];
    listatemp: any[] = [];
    length: number = 2;
    existe: number = 0;

    titulo: string = '';
    textoboton: string = '';
    lsprovee: ProveedorI[] = [];
    lsingreso: any[] = [];
    lsproducto: any[] = [];
    formulario!: FormGroup;

    lsing: any[] = [];


    lshistorial: any[] = [];
    lsseleccionados: any[] = [];
    totalmodal: number = 0;
    pagemodal: number = 0;
    searchmodal: string = '';
    idmodal: number = 0;
    busquedamodal: string = ''

    constructor(private api: VentasService, private router: Router, private apicliente: ClientesService) {
        this.formulario = new FormGroup({
            ci: new FormControl('0', Validators.required),
            nombre: new FormControl('', Validators.required),
            fechanac: new FormControl('', Validators.required),
            ingredientes: new FormControl('', Validators.required),
            unidades: new FormControl('', Validators.required),
            producto: new FormControl('', Validators.required)
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
            this.titulo = 'Registro de Ventas';
            this.textoboton = 'registrar';
            this.formulario.reset();
            this.precarga();
        }
    }

    precarga() {
        this.api.getproducto().subscribe(data => {
            this.lsproducto = data.result;
        });

        this.api.getexits().subscribe(data => {
            this.lsing = data.result;
        });
    }

    cargar() {
        var selectemp = this.lsing.find(x => x.idreceta == this.opcionSeleccionado);
        console.log(this.opcionSeleccionado)
        this.existe = selectemp.existe;
        var usado = 0;
        this.lsingreso.forEach((tmp: any) => {
                tmp.sabores.forEach((item:any) => {
                if (item.idreceta == selectemp.idreceta) {
                    usado += tmp.cantidad;
                }
            })
        });
        if ((this.unidadestemp + usado) <= this.existe && this.unidadestemp > 0) {
            this.listatemp.push({ 'nombre': selectemp?.sabor, 'cantidad': this.unidadestemp, 'idreceta': selectemp?.idreceta });
            // this.listatemp.push({ 'nombre': selectemp?.sabor, 'cantidad': this.unidadestemp, 'idreceta': selectemp?.idreceta, 'producto': this.opcionproducto, 'productonombre': selectprod.nombre });
        } else {
            Swal.fire({
                title: "Error",
                text: "Ya no existen mas unidades o La cantidad ingresada es menor a cero",
                icon: "error",
            });
        }
    }

    aceptar() {
        var selectprod = this.lsproducto.find(x => x.idproducto == this.opcionproducto);
        console.log(selectprod)
        var total = 0;
        this.listatemp.forEach(x => total += x.cantidad)
        if (selectprod.nroporcion != total) {
            Swal.fire({
                title: 'error',
                html: 'El número de porciones no es correcto',
                icon: "error",
            });
        } else {
            this.lsingreso.push({ 'nombre': selectprod.nombre, 'producto': this.opcionproducto, 'cantidad': total, 'precio': selectprod.precio, 'sabores': this.listatemp })
            this.listatemp = [];
            document.getElementById('btnclose2')?.click();
        }

    }

    cargarlista() {
        this.api.getventas({ length: this.length, page: this.page, search: this.busqueda }).subscribe(data => {
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

    asignar(id: number) {
        this.router.navigate(['factura/' + id]);
    }

    mandardatos(formu: any) {
        if (this.idseleccionado == 0) {
            this.api.postventas(formu, this.lsingreso).subscribe(data => {
                console.log(data)
                if (data.status == 'OK') {
                    Swal.fire({
                        title: "Correcto",
                        text: data.mensaje,
                        icon: "success",
                        // background: '#CCBBFF'
                    });
                    this.formulario.reset();
                    this.lsingreso = [];
                    this.mostrar(0)
                } else {
                    Swal.fire({
                        title: 'error',
                        html: data.mensaje,
                        icon: "error",
                    });
                }
            })
        }
    }

    eliminar(id: number) {
        this.lsingreso.splice(id, 1);
    }

    eliminarmodal(id: number) {
        this.listatemp.splice(id, 1);
    }

    cambiarpaginamodal(num: number) {
        this.pagemodal = num;
        this.cargarcliente();
    }

    cargarcliente() {
        this.apicliente.getClie({ length: 5, page: this.pagemodal, search: this.busquedamodal }).subscribe(data => {
            this.lshistorial = data.result;
            this.totalmodal = data.paginas;

        })
    }

    seleccionar(item: any) {
        this.formulario.controls['ci'].setValue(item.ci);
        this.formulario.controls['nombre'].setValue(item.nombre);
        document.getElementById('btnclose')?.click();
    }

    modal() {
        const element = document.getElementById('mostrar')?.click();
    }
}
