import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { PopoverComponent } from '../popover/popover.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-historial-comidas',
  templateUrl: './historial-comidas.page.html',
  styleUrls: ['./historial-comidas.page.scss'],
})
export class HistorialComidasPage {

  idUsuario;
  comidas = [];
  idsDocument = [];
  fecha: Date;
  select = 'fecha'; // campo
  palabraClave = '';
  

  constructor(public popoverController: PopoverController, private autenticacion: AuthenticationService) {

    this.idUsuario = firebase.auth().currentUser.uid;

  }


  async presentPopover(ev: any, comida) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      componentProps: {
        comidaObj: comida
      }
      
    });
    return await popover.present();
  }

  mostrarComidas() {
    

    this.comidas = [];
    this.idsDocument = [];

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
          
          


        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

  }


}
