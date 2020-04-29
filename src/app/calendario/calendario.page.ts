import { Component, OnInit, Input, NgModule } from '@angular/core';
import { PopoverController, AlertController, NavController } from '@ionic/angular';
import { PopoverAgregarComidaComponent } from '../popover-agregar-comida/popover-agregar-comida.component';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})

export class CalendarioPage implements OnInit {

  date: Date;
  type: 'string';


  constructor(private popover: PopoverController, private alert: AlertController, private nav: NavController) {

  }

  irAtras() {
     this.nav.back();
  }

  ngOnInit() {

  }

  onChange($event) {
    console.log($event);
  }

  mostrarPopover() {
    if (this.date === undefined) {
      this.presentAlert();
    } else {

      this.presentPopoverAgregarComida(null);
    }
  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Error',
      subHeader: 'No elegiste el dia.',
      message: 'Debes elegir algun dia. Pulsa en alguno.',
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentPopoverAgregarComida(ev: any) {
    let date = new Date(this.date).toLocaleDateString();
    const popover = await this.popover.create({
      component: PopoverAgregarComidaComponent,
      event: ev,
      translucent: true,
      componentProps:  {
        fecha: date,
        titulo: 'Agregar Comida',
        opcion: 'agregar',
        docId: null,
        comida: '',
        nombre: '',
        ingredientes: '',
        notas: '',
        calorias: 0

      },
      cssClass: 'popover',

    });
    
    return await popover.present();
   
  }
  
}
