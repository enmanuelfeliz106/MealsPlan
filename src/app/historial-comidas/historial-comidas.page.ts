import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { PopoverComponent } from '../popover/popover.component';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { Comida } from '../popover-agregar-comida/popover-agregar-comida.component';

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
  select = 'fecha'; // campo
  palabraClave = '';
  

  constructor(public popoverController: PopoverController, private autenticacion: AuthenticationService,
              public alert: AlertController, private nav: NavController) {

    this.idUsuario = firebase.auth().currentUser.uid;
    this.obtenerComidasDeHoy();

  }

  irAtras() {
    this.nav.back();
  }


  obtenerComidasDeHoy() {
    this.comidasDeHoy = [];
    
    let comida = firebase.firestore().collection('comidasGuardadas');
    let query = comida.where('userID', '==', this.idUsuario).where('fecha', '==', this.hoy).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
  
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            this.comidasDeHoy.push(doc.data());
  
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

    

  }


  async presentPopover(ev: any, comida) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      componentProps: {
        comidaObj: comida
      },
      cssClass: 'popover'
      
    });
    return await popover.present();
  }

  mostrarComidas() {
    

    this.comidas = [];
    this.idsDocument = [];
    this.favoritas = [];

    let fechaConvertida = new Date(this.fecha).toLocaleDateString();
    let fechaSub = new String(fechaConvertida).split('/');
    let mes = fechaSub[0];
    let dia = (parseInt(fechaSub[1], 10) + 1).toString(); // para solventar el error de obtener un dia menor en el input
    let year = fechaSub[2];
    let fechaElegida = mes + '/' + dia + '/' + year;

    let valor;
    if (this.select === 'fecha') {
      valor = fechaElegida;
    } else {
      valor = this.palabraClave;
    }

    let comida = firebase.firestore().collection('comidasGuardadas');
    let query = comida.where('userID', '==', this.idUsuario).where(this.select, '==', valor).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          this.comidas.push(doc.data());
          this.idsDocument.push(doc.id);
          this.favoritas.push(doc.get('favorita'));
          
          


        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

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
      this.alertaError('Ya tienes esta comida registrada en las comidas para hoy.');

    } else {
      firebase.firestore().collection('comidasGuardadas').add(this.nuevaComida).then( (exito) => {
      
        this.alertaExito();

        }).catch( (error) => {

          this.alertaError('Consulta con tu proveedor.');

        });
    }
    

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

  async alertaExito() {
    const alert = await this.alert.create({
      header: 'Exito',
      subHeader: 'Comida guardada',
      message: 'Puedes visualizarla en tu lista de comidas guardadas',
      buttons: ['OK'],
      cssClass: 'alertaExito'
    });

    await alert.present();
    
  }

  async alertaError(mensaje) {
    
    const alert = await this.alert.create({
          header: 'Error',
          subHeader: 'Algo salio mal',
          message: mensaje,
          buttons: ['OK'],
          cssClass: 'alertaError'
        });
    
    await alert.present();
  }


}
