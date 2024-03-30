import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngredientesI } from 'src/app/Models/Ingredientes.interface';
import { ProveedorI } from 'src/app/Models/Proveedores.interface';
import { SaboresI } from 'src/app/Models/sabores.interface';
import { IngresosService } from 'src/app/service/ingresos/ingresos.service';
import { VentasService } from 'src/app/service/ventas/ventas.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-ventas',
    templateUrl: './ventas.component.html',
    styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
    funcion: number = 0;
    busqueda: string = '';
    idseleccionado: number = 0;
    opcionSeleccionado: number = 0;
    opcionproducto: number = 0;
    page: number = 0;
    total: number = 0;
    totalvalor: number = 0;
    lista: any = [];
    length: number = 2;

    titulo: string = '';
    textoboton: string = '';
    lsprovee: ProveedorI[] = [];
    lsingreso: any = [];
    lsproducto: any[] = [];
    formulario!: FormGroup;

    lsing: any[] = [];
    constructor(private api: VentasService, private router: Router) {
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
            console.log(data);
        });
        this.api.getsabores().subscribe(data => {
            this.lsing = data.result;
            console.log(data);
        });
    }

    cargar() {
        var selectemp = this.lsing.find(x => x.idreceta == this.opcionSeleccionado);
        var selectprod = this.lsproducto.find(x => x.idproducto == this.opcionproducto);
        this.lsingreso.push({ 'nombre': selectemp?.sabor, 'cantidad': this.formulario.get('unidades')?.value, 'idreceta': selectemp?.idreceta, 'producto': this.opcionproducto, 'productonombre':  selectprod.nombre});
    }

    cargarlista() {
        this.api.getventas({ length: this.length, page: this.page, search: this.busqueda }).subscribe(data => {
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
        this.router.navigate(['factura/'+id]);
    }

    mandardatos(formu: any) {
        if (this.idseleccionado == 0) {
            this.api.postventas(formu,this.lsingreso).subscribe(data => {
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
        }
    }

    eliminar(id: number) {
        this.lsingreso.splice(id, 1);
    }
}
