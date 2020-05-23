import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, NavController, PickerController } from '@ionic/angular';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { CRUDComidasService, Comida } from '../services/crud-comidas.service';
import { format} from 'date-fns';



@Component({
  selector: 'app-historial-comidas',
  templateUrl: './historial-comidas.page.html',
  styleUrls: ['./historial-comidas.page.scss'],
})
export class HistorialComidasPage {


  idUsuario;
  comidas = [];
  idsDocument = [];
  favoritas = [];
  hoy = format(new Date(), 'MM/dd/yyyy');
  fecha: Date;
  yearMin = new Date().getFullYear();
  yearMax = this.yearMin + 1;
  select = 'fecha'; // campo o filtro
  palabraClave = '';
  botonMostrar: boolean;



  constructor(public popoverController: PopoverController, private crud: CRUDComidasService,
              public alert: AlertController, private nav: NavController) {


    this.idUsuario = firebase.auth().currentUser.uid;
    this.obtenerComidasDeHoy();
    this.botonMostrar = false;

  }


  irAtras() {
    this.nav.back();
  }


  obtenerComidasDeHoy() {

    this.crud.mostrarComidas('fecha', this.hoy);

  }

  mostrarComidas() {

    this.comidas = [];
    this.idsDocument = [];
    this.favoritas = [];
    let fechaElegida = format(new Date(this.fecha), 'MM/dd/yyyy');

    let valor;
    if (this.select === 'fecha') {
      valor = fechaElegida;
    } else {
      valor = this.palabraClave;
    }

    this.crud.mostrarComidas(this.select, valor);
    this.comidas = this.crud.comidas;
    this.idsDocument = this.crud.idsDocument;
    this.favoritas = this.crud.favoritas;

    this.botonMostrar = true;
    setTimeout(exito => {this.botonMostrar = false; }, 2000);

  }

  favorita(index: number, idDoc: string) {
    if (this.favoritas[index] === false) {

      $("#boton" + idDoc).removeAttr("color");
      $("#boton" + idDoc).attr("color", "warning");

      firebase.firestore().collection('comidasGuardadas').doc(idDoc).update({favorita: true});
      this.favoritas[index] = true;

    } else {

      $("#boton" + idDoc).removeAttr("color");
      $("#boton" + idDoc).attr("color", "light");

      firebase.firestore().collection('comidasGuardadas').doc(idDoc).update({favorita: false});
      this.favoritas[index] = false;
    }
  }

  

  presentPopover(ev, comida) {
    this.crud.popoverMostrarDetalles(ev, comida);
  }

  pasarComidaAHoy(index) {
    this.crud.presentAlertPasarComida(index);
  }

}
