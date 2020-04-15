import { PopoverController } from '@ionic/angular';
import { Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase';
import { Cordova} from '@ionic-native/core';

interface nuevaComida {
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

  nuevaComida: nuevaComida;



  constructor(private firestore: AngularFirestore, private user: FirebaseAuthentication,
              private popover: PopoverController, private firebase: Firebase) {
    this.user.signInWithEmailAndPassword('enmanuelfeliz106@gmail.com', 'universal0707');
  
  }
    ngOnInit() {
      
  }

    agregarComida(fecha: Date) {
    this.nuevaComida.fecha = fecha;
    this.nuevaComida.userID = firebase.auth().currentUser.uid;
    this.nuevaComida.nombre = this.nombre;
    this.nuevaComida.comida = this.comida;
    this.nuevaComida.ingredientes = this.ingredientes;
    this.nuevaComida.notas = this.notas;
    this.nuevaComida.calorias = this.calorias;

    this.firestore.collection('comidasGuardadas').add(this.nuevaComida);
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
