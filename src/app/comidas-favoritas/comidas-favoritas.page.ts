import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-comidas-favoritas',
  templateUrl: './comidas-favoritas.page.html',
  styleUrls: ['./comidas-favoritas.page.scss'],
})
export class ComidasFavoritasPage implements OnInit {

  idUsuario;
  comidas = [];
  

  constructor(public popoverController: PopoverController, private autenticacion: AuthenticationService, private nav: NavController) {

    this.idUsuario = firebase.auth().currentUser.uid;

    this.mostrarComidas();

  }

  irAtras() {
    this.nav.back();
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

    let comida = firebase.firestore().collection('comidasGuardadas');
    let query = comida.where('userID', '==', this.idUsuario).where('favorita', '==', true).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          this.comidas.push(doc.data());
          
          
          


        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

  }

  ngOnInit() {
  }

}
