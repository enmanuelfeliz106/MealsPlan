import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { PopoverController, AlertController, LoadingController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { format} from 'date-fns';

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

  validador: boolean; // valida que la comida no este en home, si lo esta, no la agrega
  idUsuario;
  nuevaComida: Comida;
  comidas = [];
  comidasDeHoy;
  idsDocument = [];
  checkButton = [];
  favoritas = [];
  hoy = format(new Date(), 'MM/dd/yyyy');

  constructor(public popover: PopoverController, public alerta: AlertController, public loaderCtrl: LoadingController) {
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
    
  }

  mostrarComidas(filtro: string, valor: any) {
    this.presentLoading();
    this.comidas = [];
    this.idsDocument = [];
    this.checkButton = [];
    this.favoritas = [];
    let comida = firebase.firestore().collection('comidasGuardadas');
    let query = comida.where('userID', '==', this.idUsuario).where(filtro, '==', valor).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          this.loaderCtrl.dismiss();
          return;
        }

        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          this.comidas.push(doc.data());
          this.idsDocument.push(doc.id);
          this.checkButton.push(doc.get('check'));
          this.favoritas.push(doc.get('favorita'));


        });
        this.loaderCtrl.dismiss();
      })
      .catch(err => {

        this.alertaError('Hubo un error cargando las comidas, intenta de nuevo refrescando. Si el problema persiste contactanos.');
        console.log('Error getting documents', err);
        this.loaderCtrl.dismiss();
      });
  }

  pasarAHoy(index) {
    this.mostrarComidas('fecha', this.hoy);
    this.comidasDeHoy = this.comidas;

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

          this.alertaError('Intente de nuevo. Si el problema persiste, reporte su situación a nuestro correo.');

        });
    }

  }

  async presentAlertPasarComida(index) {
    const alert = await this.alerta.create({
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

  async popoverMostrarDetalles(ev: any, comida) {
    const popover = await this.popover.create({
      component: PopoverComponent,
      event: ev,
      backdropDismiss: false,
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
      message: 'Puedes visualizarla en tu lista de comidas de hoy',
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
            this.presentAlertComidaBorrada();
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

  async presentLoading() {
    const loading = await this.loaderCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor...',

    });
    await loading.present();
  }


}
