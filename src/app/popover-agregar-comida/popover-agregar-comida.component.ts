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
  ingredientes: Array<any>;
  notas: string;
  calorias: number;
  check: boolean;
  favorita: boolean;
}


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
  nuevaComida: Comida;
  fechaElegida = new Date(this.fecha.fecha).toLocaleDateString();
  
  

  constructor(private firestore: AngularFirestore, private user: FirebaseAuthentication,
              private popover: PopoverController, public alerta: AlertController,
              private fecha: FechaService) {

  }
    ngOnInit() {
     
  }

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

    agregarOActualizarComida(opcion: string, idDoc, comida: string, nombre: string, ingredientes: string, notas: string,
                             calorias: number) {
    
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

      let ingredientesArray = new String(this.ingredientes).split(',');
      
      this.nuevaComida = {
          fecha: this.fechaElegida,
          userID: firebase.auth().currentUser.uid,
          comida: this.comida,
          nombre: this.nombre,
          ingredientes: ingredientesArray,
          notas: this.notas,
          calorias: this.calorias,
          check: false,
          favorita: false
        };

      this.firestore.collection('comidasGuardadas').add(this.nuevaComida).then( (exito) => {
        
        this.alertaExito();
        this.popover.dismiss();

        }).catch( (error) => {

          this.alertaError();
          this.popover.dismiss();

          
        });

      } else {
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
      
              this.alertaError();
              this.popover.dismiss();
      
              
            });
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
