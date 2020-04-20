import { Component } from '@angular/core';
import * as $ from 'jquery';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { MenuController } from '@ionic/angular';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  idUsuario;
  comidas = [];
  idsDocument = [];
  checkButton = [];
  hoy = new Date().toLocaleDateString();
  fecha = new Date().toLocaleDateString();

  constructor(public popoverController: PopoverController, private menu: MenuController, 
              private autenticacion: AuthenticationService, private router: Router) {

    this.autenticacion.login('enmanuelfeliz106@gmail.com', 'universal0707');
    this.idUsuario = firebase.auth().currentUser.uid;
                
    let comida = firebase.firestore().collection('comidasGuardadas');
    let query = comida.where('userID', '==', this.idUsuario).where('fecha', '==', this.fecha).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          this.comidas.push(doc.data());
          this.idsDocument.push(doc.id);
          
          this.checkButton.push(doc.get('check'));


        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

     

  }

  check(index: number, idDoc: string) {
    if (this.checkButton[index] === false) {
      
   
      $("ion-item #" + idDoc).removeAttr("color");
      $("ion-item #" + idDoc).attr("color", "success");
      

      firebase.firestore().collection('comidasGuardadas').doc(idDoc).update({check: true});
      this.checkButton[index] = true;
      

      

    } else {
      
      $("ion-item #" + idDoc).removeAttr("color");
      $("ion-item #" + idDoc).attr("color", "light");

      firebase.firestore().collection('comidasGuardadas').doc(idDoc).update({check: false});
      this.checkButton[index] = false;
    } 
     

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

  openFirstMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}
