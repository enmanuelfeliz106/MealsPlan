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
import { PopoverAgregarComidaComponent } from '../popover-agregar-comida/popover-agregar-comida.component';
import { FechaService } from '../services/fecha.service';



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
  favoritas = [];
  hoy = new Date().toLocaleDateString();
  fecha = new Date().toLocaleDateString();


  constructor(public popoverController: PopoverController, private menu: MenuController, 
              private autenticacion: AuthenticationService, private router: Router, public popover: PopoverController) {
    
        

    this.autenticacion.login('enmanuelfeliz106@gmail.com', 'universal0707');
    this.idUsuario = firebase.auth().currentUser.uid;
    this.obtenerComidas();

    
  }

  obtenerComidas() {
    this.comidas = [];
    this.idsDocument = [];
    this.checkButton = [];

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
          this.favoritas.push(doc.get('favorita'));


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

  agregarAFavoritas(index: number, idDoc: string) {
    if (this.favoritas[index] === false) {
      
   
      $("ion-item-options #favorita" + idDoc).removeAttr("color");
      $("ion-item-options #favorita" + idDoc).attr("color", "warning");
      

      firebase.firestore().collection('comidasGuardadas').doc(idDoc).update({favorita: true});
      this.favoritas[index] = true;
      

      

    } else {
      
      $("ion-item-options #favorita" + idDoc).removeAttr("color");
      $("ion-item-options #favorita" + idDoc).attr("color", "light");

      firebase.firestore().collection('comidasGuardadas').doc(idDoc).update({favorita: false});
      this.favoritas[index] = false;
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

  actualizarComida(ev: any, idDoc, comida: string, nombre: string, ingredientes: string, notas: string,
                 calorias: number ) {

    this.presentPopoverAgregarComida(ev, idDoc, comida, nombre, ingredientes, notas, calorias);
    
    
    
    
  }

  async presentPopoverAgregarComida(ev: any, idDoc, comida: string, nombre: string, ingredientes: string, notas: string,
                                    calorias: number ) {
    

    const popover = await this.popover.create({
      component: PopoverAgregarComidaComponent,
      event: ev,
      translucent: true,
      componentProps:  {
        fechaElegida: this.hoy,
        titulo: 'Editar Comida',
        opcion: 'editar',
        docId: idDoc,
        comida: comida,
        nombre: nombre,
        ingredientes: ingredientes,
        notas: notas,
        calorias: calorias

      },
      cssClass: 'popover'
      
    });
    
    return await popover.present();
   
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.obtenerComidas();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  
}
