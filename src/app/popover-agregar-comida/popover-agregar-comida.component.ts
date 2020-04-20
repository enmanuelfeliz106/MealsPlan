import { PopoverController, AlertController } from '@ionic/angular';
import { Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase';
import { Cordova} from '@ionic-native/core';
import { CalendarioPage } from '../calendario/calendario.page';
import { FechaService } from '../services/fecha.service';

export interface Comida {
  fecha: string;
  userID: string;
  comida: string;
  nombre: string;
  ingredientes: string;
  notas: string;
  calorias: number;
  check: boolean;
}


@Component({
  selector: 'app-popover-agregar-comida',
  templateUrl: './popover-agregar-comida.component.html',
  styleUrls: ['./popover-agregar-comida.component.scss']
})


export class PopoverAgregarComidaComponent implements OnInit {

  comida: string;
  nombre: string;
  ingredientes: string;
  notas: string;
  calorias: number;
  nuevaComida: Comida;
  fechaElegida = new Date(this.fecha.fecha).toLocaleDateString();

  constructor(private firestore: AngularFirestore, private user: FirebaseAuthentication,
              private popover: PopoverController, public alerta: AlertController,
              private fecha: FechaService) {

  }
    ngOnInit() {
     
  }

    agregarComida() {

    this.nuevaComida = {
        fecha: this.fechaElegida,
        userID: firebase.auth().currentUser.uid,
        comida: this.comida,
        nombre: this.nombre,
        ingredientes: this.ingredientes,
        notas: this.notas,
        calorias: this.calorias,
        check: false
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
