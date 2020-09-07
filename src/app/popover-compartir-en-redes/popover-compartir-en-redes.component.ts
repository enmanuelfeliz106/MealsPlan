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

      this.share.shareViaWhatsApp(mensaje).then(exito =>{
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

      this.share.shareViaInstagram(mensaje, null).then(exito =>{
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

  compartirEnFacebook(comida, nombre, ingredientes, notas, calorias) {
    let mensaje = 'Mira mi ' + comida + ' que he planeado con Meals Plan. ' + '-----' + nombre + '----- ' + ' INGREDIENTES: ' + ingredientes + '.' + ' NOTAS: ' + notas + '.' + ' CALORÍAS: ' + calorias + '.';
    this.share.canShareVia('facebook').then(exito => {

      this.share.shareViaFacebook(mensaje).then(exito =>{
        this.popoverController.dismiss();
      }).catch(err => {
        this.popoverController.dismiss();
        this.alerta.alertaError('Error al compartir comida en facebook' + err);
      });

    }).catch(error => {
      this.popoverController.dismiss();
      this.alerta.alertaError('Error al compartir comida en facebook' + error);
    });

  }

  compartirPorCorreo(comida, nombre, ingredientes, notas, calorias) {
    let mensaje = 'Mira mi ' + comida + ' que he planeado con Meals Plan. ' + '-----' + nombre + '----- ' + ' INGREDIENTES: ' + ingredientes + '.' + ' NOTAS: ' + notas + '.' + ' CALORÍAS: ' + calorias + '.';
    this.share.canShareViaEmail().then(exito => {

      this.share.shareViaEmail(mensaje, 'Mi comida planeada con Meals Plan', ['']).then(exito =>{
        this.popoverController.dismiss();
      }).catch(err => {
        this.popoverController.dismiss();
        this.alerta.alertaError('Error al compartir comida por correo' + err);
      });

    }).catch(error => {
      this.popoverController.dismiss();
      this.alerta.alertaError('Error al compartir comida por correo' + error);
    });

  }

  cerrarPopover() {

    this.popoverController.dismiss();
  }

}
