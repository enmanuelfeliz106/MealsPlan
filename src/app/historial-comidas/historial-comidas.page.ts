import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, NavController, PickerController } from '@ionic/angular';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { CRUDComidasService, Comida } from '../services/crud-comidas.service';
import { format, add } from 'date-fns';

@Component({
  selector: 'app-historial-comidas',
  templateUrl: './historial-comidas.page.html',
  styleUrls: ['./historial-comidas.page.scss'],
})
export class HistorialComidasPage {

  validador: boolean; // valida que la comida no este en home, si lo esta, no la agrega
  nuevaComida: Comida;
  idUsuario;
  comidas = [];
  comidasDeHoy;
  idsDocument = [];
  favoritas = [];
  hoy = new Date().toLocaleDateString();
  fecha: Date;
  select = 'fecha'; // campo o filtro
  palabraClave = '';



  constructor(public popoverController: PopoverController, private crud: CRUDComidasService,
              public alert: AlertController, private nav: NavController) {


    this.idUsuario = firebase.auth().currentUser.uid;
    this.obtenerComidasDeHoy();


  }


  irAtras() {
    this.nav.back();
  }


  obtenerComidasDeHoy() {
    this.comidasDeHoy = [];

    this.crud.mostrarComidas('fecha', this.hoy);
    this.comidasDeHoy = this.crud.comidas;
  }

  mostrarComidas() {

    this.comidas = [];
    this.idsDocument = [];
    this.favoritas = [];
    let fechaFormateada = format(new Date(this.fecha), 'M/dd/yyyy');
    let fechaSub = new String(fechaFormateada).split('/');
    let year = fechaSub[2];
    let mes =  fechaSub[0];
    let dia = (parseInt(fechaSub[1], 10) + 1).toString(); // para solventar el error de obtener un dia menor en el input
    let fechaElegida = mes + '/' + dia + '/' + year;
    


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

  pasarAHoy(index) {


    this.nuevaComida = {
        fecha: this.hoy,
        userID: this.idUsuario,
        comida: this.comidas[index].comida,
        nombre: this.comidas[index].nombre,
        ingredientes: this.comidas[index].ingredientes,
        notas: this.comidas[index].notas,
        calorias: this.comidas[index].calorias,
        check: false,
        favorita: false
      };

    let comidaReset: Comida;


    for (let i = 0; i < this.comidasDeHoy.length; i++) {
      comidaReset = {
        fecha: this.hoy,
        userID: this.comidasDeHoy[i].userID,
        comida: this.comidasDeHoy[i].comida,
        nombre: this.comidasDeHoy[i].nombre,
        ingredientes: this.comidasDeHoy[i].ingredientes,
        notas: this.comidasDeHoy[i].notas,
        calorias: this.comidasDeHoy[i].calorias,
        check: false,
        favorita: false
      };


      if (this.nuevaComida.comida === comidaReset.comida &&
          this.nuevaComida.nombre === comidaReset.nombre && 
          this.nuevaComida.ingredientes === comidaReset.ingredientes &&
          this.nuevaComida.fecha === comidaReset.fecha &&
          this.nuevaComida.notas === comidaReset.notas && 
          this.nuevaComida.calorias === comidaReset.calorias &&
          this.nuevaComida.check === comidaReset.check &&
          this.nuevaComida.favorita === comidaReset.favorita && 
          this.nuevaComida.userID === comidaReset.userID) {

        this.validador = true;
        break;

      } else {
        this.validador = false;
      }

    }

    if (this.validador === true) {
      this.crud.alertaError('Ya tienes esta comida registrada en las comidas para hoy.');

    } else {
      firebase.firestore().collection('comidasGuardadas').add(this.nuevaComida).then( (exito) => {

        this.crud.alertaExito();

        }).catch( (error) => {

          this.crud.alertaError('Intente de nuevo. Si el problema persiste, reporte su situación a nuestro correo.');

        });
    }

  }

  presentPopover(ev, comida) {
    this.crud.popoverMostrarDetalles(ev, comida);
  }

  async presentAlertPasarComida(index) {
    const alert = await this.alert.create({
      header: 'Pasar comida para hoy',
      subHeader: '¿Seguro que desea hacerlo?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          handler: () => {
            this.pasarAHoy(index);
          }
        }]
    });

    await alert.present();
  }

}
