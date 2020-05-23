import { Component, OnInit} from '@angular/core';
import { PopoverController, MenuController, AlertController } from '@ionic/angular';
import { PopoverTablaMedidasComponent } from '../popover-tabla-medidas/popover-tabla-medidas.component';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  login: boolean;
  constructor(public popover: PopoverController, private menu: MenuController, private router: Router, 
              public alert: AlertController, private autenticacion: AuthenticationService) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.login = false;
      } else {
        // No user is signed in.
        this.login = true;
      }
    });

   }

  ngOnInit() {}

  async presentPopoverTabla(ev: any) {
    const popover = await this.popover.create({
      component: PopoverTablaMedidasComponent,
      event: ev,
      translucent: true,
      backdropDismiss: false,
      cssClass: 'popover'
    });
    return await popover.present();
  }

  cerrarMenu() {
    this.menu.close();
  }

  cerrarSesion() {
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alert.create({
      header: 'Cerrar Sesión',
      message: '¿Seguro que desea irse?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        }, {
          text: 'Sí',
          handler: () => {
            this.autenticacion.cerrarSesion();
          }
        }
      ]
    });

    await alert.present();
  }

}

