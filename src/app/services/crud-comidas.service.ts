import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

export interface Comida {
  fecha: string;
  userID: string;
  comida: string;
  nombre: string;
  ingredientes: Array<any>;
  notas: string;
  calorias: number;
  check: boolean;
  favorita: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class CRUDComidasService {

  idUsuario;
  vacio: boolean;
  comidas = [];
  idsDocument = [];
  checkButton = [];
  favoritas = [];

  constructor(public popover: PopoverController, public alerta: AlertController) {
    this.idUsuario = firebase.auth().currentUser.uid;
  }

  agregarComida(fecha: string, comida: string, nombre: string, ingredientes: string, notas: string, calorias: number) {
    let ingredientesArray = new String(ingredientes).split(',');

    let nuevaComida: Comida;

    nuevaComida = {
      fecha: fecha,
      userID: firebase.auth().currentUser.uid,
      comida: comida,
      nombre: nombre,
      ingredientes: ingredientesArray,
      notas: notas,
      calorias: calorias,
      check: false,
      favorita: false
    };

    firebase.firestore().collection('comidasGuardadas').add(nuevaComida).then( (exito) => {
      this.alertaExito();
      this.popover.dismiss();

      }).catch( (error) => {

        this.alertaError('Intente de nuevo. Si el problema persiste, reporte su situación a nuestro correo.');
        this.popover.dismiss();

    });
  }

  actualizarComida(idDoc: string, comida: string, nombre: string, ingredientes: string, notas: string, calorias: number) {
    let ingredientesArray = new String(ingredientes).split(',');

    firebase.firestore().collection('comidasGuardadas').doc(idDoc).update({
      comida: comida,
      nombre: nombre,
      ingredientes: ingredientesArray,
      notas: notas,
      calorias: calorias}).then( (exito) => {

          this.alertaExito();
          this.popover.dismiss();

      }).catch( (error) => {

        this.alertaError('Intente de nuevo. Si el problema persiste, reporte su situación a nuestro correo.');
        this.popover.dismiss();

      });

  }

  borrarComida(idDoc) {
    this.presentAlertBorrarComida(idDoc);
    this.presentAlertComidaBorrada();
  }

  mostrarComidas(filtro: string, valor: any) {
    let comida = firebase.firestore().collection('comidasGuardadas');
    let query = comida.where('userID', '==', this.idUsuario).where(filtro, '==', valor).get()
      .then(snapshot => {
        if (snapshot.empty) {
          this.vacio = true;
          console.log('No matching documents.');
          return;
        } else {
          this.vacio = false;
        }

        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          this.comidas.push(doc.data());
          this.idsDocument.push(doc.id);
          this.checkButton.push(doc.get('check'));
          this.favoritas.push(doc.get('favorita'));


        });
      })
      .catch(err => {

        console.log('Error getting documents', err);
      });
  }

  async popoverMostrarDetalles(ev: any, comida) {
    const popover = await this.popover.create({
      component: PopoverComponent,
      event: ev,
      componentProps: {
        comidaObj: comida
      },
      cssClass: 'popover'

    });
    return await popover.present();
  }

  async alertaExito() {
    const alert = await this.alerta.create({
      header: 'Exito',
      subHeader: 'Comida guardada',
      message: 'Puedes visualizarla en tu lista de comidas guardadas',
      buttons: ['OK'],
      cssClass: 'alertaExito'
    });

    await alert.present();
  }

  async alertaError(mensaje) {

    const alert = await this.alerta.create({
          header: 'Error',
          subHeader: 'Algo salio mal',
          message: mensaje,
          buttons: ['OK'],
          cssClass: 'alertaError'
        });

    await alert.present();
  }

  async presentAlertBorrarComida(idDoc) {
    const alert = await this.alerta.create({
      header: 'Eliminar Comida',
      subHeader: '¿Seguro que desea eliminar esta comida?',
      message: 'Si la elimina no se registrará en el historial de comidas ni en favoritas.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            firebase.firestore().collection('comidasGuardadas').doc(idDoc).delete();
          }
        }]
    });

    await alert.present();
  }

  async presentAlertComidaBorrada() {
    const alert = await this.alerta.create({
      header: 'Exito',
      subHeader: 'Comida eliminada.',
      message: 'Recuerde refrescar para ver los cambios en la pantalla.',
      buttons: ['Ok']
    });

    await alert.present();
  }

}
