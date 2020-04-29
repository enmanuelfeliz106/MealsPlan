import { PopoverController, AlertController } from '@ionic/angular';
import { Component, OnInit} from '@angular/core';
import { CRUDComidasService } from '../services/crud-comidas.service';

@Component({
  selector: 'app-popover-agregar-comida',
  templateUrl: './popover-agregar-comida.component.html',
  styleUrls: ['./popover-agregar-comida.component.scss']
})


export class PopoverAgregarComidaComponent implements OnInit {
  mensajeError = '';
  tieneComa: boolean;
  comida: string;
  nombre: string;
  ingredientes: string;
  notas: string;
  calorias: number;
  

  constructor(private popover: PopoverController, public alerta: AlertController, private crud: CRUDComidasService) { }

  ngOnInit() { }

  validarComas(ingredientes: string) {

    let ing = new String(ingredientes);

    for (let i = 0; i < this.ingredientes.length; i++) {
      if (ing.charAt(i) === ',') {
        this.tieneComa = true;
        break;
      } else {
        this.tieneComa = false;
      }
    }
  }

  agregarOActualizarComida(opcion: string, fecha: string, idDoc, comida: string, nombre: string, ingredientes: string, 
                           notas: string, calorias: number) {

    this.mensajeError = '';

    if (opcion === 'agregar') {
      this.validarComas(this.ingredientes);
    } else {
      this.validarComas(ingredientes);
    }

    if (this.comida === '' || this.nombre === '' || this.ingredientes === '') {
      this.mensajeError = 'Solo los campos de notas y calorías pueden estar vacíos.';

    } else if (this.tieneComa === false) {
      this.mensajeError = 'Por favor, divida los ingredientes por comas.';

    } else {

      if (opcion === 'agregar') {

      this.crud.agregarComida(fecha, this.comida, this.nombre, this.ingredientes, this.notas, this.calorias);

      } else {
        this.crud.actualizarComida(idDoc, comida, nombre, ingredientes, notas, calorias);
      }

    }
  }

  cerrarPopover() {
    this.comida = '';
    this.nombre = '';
    this.ingredientes = '';
    this.notas = '';
    this.calorias = 0;

    this.popover.dismiss();
  }

}
