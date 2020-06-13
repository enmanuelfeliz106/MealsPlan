import { Component } from '@angular/core';
import * as $ from 'jquery';
import { PopoverController, AlertController} from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import * as firebase from 'firebase';
import { PopoverAgregarComidaComponent } from '../popover-agregar-comida/popover-agregar-comida.component';
import { CRUDComidasService } from '../services/crud-comidas.service';
import { format} from 'date-fns';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  comidas = [];
  idsDocument = [];
  checkButton = [];
  favoritas = [];
  hoy = format(new Date(), 'MM/dd/yyyy');

  constructor(public popoverController: PopoverController, private crud: CRUDComidasService,
              public popover: PopoverController, public alert: AlertController) {

      this.obtenerComidas();

  }

  obtenerComidas() {
    this.comidas = [];
    this.idsDocument = [];
    this.checkButton = [];
    this.favoritas = [];
    this.crud.mostrarComidas('fecha', this.hoy);
    this.comidas = this.crud.comidas;
    this.idsDocument = this.crud.idsDocument;
    this.checkButton = this.crud.checkButton;
    this.favoritas = this.crud.favoritas;

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

  presentPopover(ev: any, comida) {
    this.crud.popoverMostrarDetalles(ev, comida);
  }

  borrarComida(idDoc) {
    this.crud.borrarComida(idDoc);
  }

  async presentPopoverAgregarComida(ev: any, idDoc, comida: string, nombre: string, ingredientes: Array<any>, notas: string,
                         calorias: number ) {
    
    let ingredientesArrayToString: string = '';
    for (let i = 0; i < ingredientes.length - 1; i++) {
      
      ingredientesArrayToString += ingredientes[i] + ','; // agregar comas
    }
    
    ingredientesArrayToString += ingredientes[ingredientes.length - 1]; // quitar ultima coma

    let fechaLocal = new Date().toLocaleDateString();

    const popover = await this.popover.create({
      component: PopoverAgregarComidaComponent,
      event: ev,
      backdropDismiss: false,
      translucent: true,
      componentProps:  {
        fechaLocal: fechaLocal,
        fecha: this.hoy,
        titulo: 'Editar Comida',
        opcion: 'editar',
        docId: idDoc,
        comida: comida,
        nombre: nombre,
        ingredientes: ingredientesArrayToString,
        notas: notas,
        calorias: calorias

      },
      cssClass: 'popover'
      
    });
    
    return await popover.present();
   
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.hoy = format(new Date(), 'MM/dd/yyyy');
    this.obtenerComidas();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


}
