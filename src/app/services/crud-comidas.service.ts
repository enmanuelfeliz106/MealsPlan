import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { PopoverController, AlertController, LoadingController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { format} from 'date-fns';

export interface Comida {
  fecha: string;
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
    let usuarioID = firebase.auth().currentUser.uid;
    nuevaComida = {
      fecha: fecha,
      comida: comida,
      nombre: nombre,
      ingredientes: ingredientesArray,
      notas: notas,
      calorias: calorias,
      check: false,
      favorita: false
    };

    firebase.firestore().collection('usuarios').doc(usuarioID).collection('comidasGuardadas').add(nuevaComida).then( (exito) => {
      this.alertaExito();
      this.popover.dismiss();

      }).catch( (error) => {

        this.alertaError('Intente de nuevo. Si el problema persiste, reporte su situación a nuestro correo.');
        this.popover.dismiss();

    });
    /*
    firebase.firestore().collection('comidasGuardadas').add(nuevaComida).then( (exito) => {
      this.alertaExito();
      this.popover.dismiss();

      }).catch( (error) => {

        this.alertaError('Intente de nuevo. Si el problema persiste, reporte su situación a nuestro correo.');
        this.popover.dismiss();

    });*/
  }

  actualizarComida(idDoc: string, comida: string, nombre: string, ingredientes: string, notas: string, calorias: number) {
    let ingredientesArray = new String(ingredientes).split(',');

    firebase.firestore().collection('usuarios').doc(this.idUsuario).collection('comidasGuardadas').doc(idDoc).update({
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
    let comida = firebase.firestore().collection('usuarios').doc(this.idUsuario).collection('comidasGuardadas');
    let query = comida.where(filtro, '==', valor).get()
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

  pasarAHoy(comida, idDoc) {
    

    this.nuevaComida = {
        fecha: this.hoy,
        comida: comida.comida,
        nombre: comida.nombre,
        ingredientes: comida.ingredientes,
        notas: comida.notas,
        calorias: comida.calorias,
        check: false,
        favorita: comida.favorita
      };

    firebase.firestore().collection('usuarios').doc(this.idUsuario).collection('comidasGuardadas').doc(idDoc).
    update({favorita: false}); // quitar de favorita para no repetirla en la pagina de favoritas

    firebase.firestore().collection('usuarios').doc(this.idUsuario).collection('comidasGuardadas').add(this.nuevaComida).then( (exito) => {

        this.alertaExito();

        }).catch( (error) => {

          this.alertaError('Intente de nuevo. Si el problema persiste, reporte su situación a nuestro correo.');

        });

  }

  async presentAlertPasarComida(comida, idDoc) {
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
            this.pasarAHoy(comida, idDoc);
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
      message: 'Puedes visualizarla en tu lista de comidas de hoy, recuerda refrescar para notar los cambios.',
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
            firebase.firestore().collection('usuarios').doc(this.idUsuario).collection('comidasGuardadas').doc(idDoc).delete();
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
