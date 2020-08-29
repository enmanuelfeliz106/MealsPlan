import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PopoverController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-popover-compartir-en-redes',
  templateUrl: './popover-compartir-en-redes.component.html',
  styleUrls: ['./popover-compartir-en-redes.component.scss'],
})
export class PopoverCompartirEnRedesComponent implements OnInit {

  comida;

  constructor(private share: SocialSharing, public popoverController: PopoverController, private alerta: AuthenticationService) { }

  ngOnInit() {}

  compartirEnWhatsapp(comida, nombre, ingredientes, notas, calorias) {
    let mensaje = 'Mira mi ' + comida + ' que he planeado con Meals Plan. ' + '-----' + nombre + '----- ' + ' INGREDIENTES: ' + ingredientes + '.' + ' NOTAS: ' + notas + '.' + ' CALORÍAS: ' + calorias + '.';
    this.share.canShareVia('whatsapp').then(exito => {

      this.share.shareViaWhatsApp(mensaje, 'assets\MealsPlan-azul.png', 'https://docs.google.com/document/d/1m1M0Ls5L8kOPD_GY1Cyjzlt5txjhqYJ1AoujUBbavf0/edit').then(exito =>{
        this.popoverController.dismiss();
      }).catch(err => {
        this.popoverController.dismiss();
        this.alerta.alertaError('Error al compartir comida en whatsapp' + err);
      });

    }).catch(error => {
      this.popoverController.dismiss();
      this.alerta.alertaError('Error al compartir comida en whatsapp' + error);
    });

  }

  compartirEnInstagram(comida, nombre, ingredientes, notas, calorias) {
    let mensaje = 'Mira mi ' + comida + ' que he planeado con Meals Plan. ' + '-----' + nombre + '----- ' + ' INGREDIENTES: ' + ingredientes + '.' + ' NOTAS: ' + notas + '.' + ' CALORÍAS: ' + calorias + '.';
    this.share.canShareVia('instagram').then(exito => {

      this.share.shareViaInstagram(mensaje, 'assets\MealsPlan-azul.png').then(exito =>{
        this.popoverController.dismiss();
      }).catch(err => {
        this.popoverController.dismiss();
        this.alerta.alertaError('Error al compartir comida en instagram' + err);
      });

    }).catch(error => {
      this.popoverController.dismiss();
      this.alerta.alertaError('Error al compartir comida en instagram' + error);
    });

  }

  cerrarPopover() {

    this.popoverController.dismiss();
  }

}
