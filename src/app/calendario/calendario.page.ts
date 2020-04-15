import { Component, OnInit, Input, NgModule } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopoverAgregarComidaComponent } from '../popover-agregar-comida/popover-agregar-comida.component';
import { stringify } from 'querystring';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  date: Date;
  type: 'string';


  constructor(private popover: PopoverController, private alert: AlertController) {

   }

  ngOnInit() {

  }

  onChange($event) {
    console.log($event);
    
  }

  mostrarPopover() {

    if (this.date === null) {
      this.presentAlert();
    } else {

      this.presentPopover(null);
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


  async presentPopover(ev: any) {
    

    const popover = await this.popover.create({
      component: PopoverAgregarComidaComponent,
      event: ev,
      translucent: true,
      componentProps:  {
        fecha: this.date

      },
      cssClass: 'popover'
      
    });
    
    return await popover.present();
   
  }


}
