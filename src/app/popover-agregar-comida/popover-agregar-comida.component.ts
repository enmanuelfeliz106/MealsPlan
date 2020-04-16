import { PopoverController, AlertController } from '@ionic/angular';
import { Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase';
import { Cordova} from '@ionic-native/core';

export interface Comida {
  fecha: Date;
  userID: string;
  comida: string;
  nombre: string;
  ingredientes: string;
  notas: string;
  calorias: number;
}


@Component({
  selector: 'app-popover-agregar-comida',
  templateUrl: './popover-agregar-comida.component.html',
  styleUrls: ['./popover-agregar-comida.component.scss'],
})


export class PopoverAgregarComidaComponent implements OnInit {

  comida: string;
  nombre: string;
  ingredientes: string;
  notas: string;
  calorias: number;

  nuevaComida: Comida;

  constructor(private firestore: AngularFirestore, private user: FirebaseAuthentication,
              private popover: PopoverController, private firebase: Firebase, public alerta: AlertController) {
    this.user.signInWithEmailAndPassword('enmanuelfeliz106@gmail.com', 'universal0707');

  }
    ngOnInit() {
      
  }

    agregarComida() {

    this.nuevaComida = {
        fecha: new Date(),
        userID: firebase.auth().currentUser.uid,
        comida: this.comida,
        nombre: this.nombre,
        ingredientes: this.ingredientes,
        notas: this.notas,
        calorias: this.calorias

      };

    this.firestore.collection('comidasGuardadas').add(this.nuevaComida).then( (exito) => {
      
      this.alertaExito();
      this.popover.dismiss();

      }).catch( (error) => {

        this.alertaError();
        this.popover.dismiss();

        
      });
  }

  cerrarPopover() {
    this.comida = '';
    this.nombre = '';
    this.ingredientes = '';
    this.notas = '';
    this.calorias = 0;
    
    this.popover.dismiss();
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

  async alertaError() {
    this.popover.dismiss();
    const alert = await this.alerta.create({
          header: 'Error',
          subHeader: 'Algo salio mal',
          message: 'Consulta con tu proveedor',
          buttons: ['OK'],
          cssClass: 'alertaError'
        });
    
    await alert.present();
  }



  


}
