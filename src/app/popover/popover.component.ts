import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverCompartirEnRedesComponent } from '../popover-compartir-en-redes/popover-compartir-en-redes.component';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],

})
export class PopoverComponent implements OnInit {

  comidaObj;

  especificacionesAvanzadas = false;
  macronutrientes = false;
  micronutrientes = false;
  iconoEspecificacionesAvanzadas = 'chevron-forward-outline';
  iconoMacronutrientes = 'chevron-forward-outline';
  iconoMicronutrientes = 'chevron-forward-outline';

  constructor(public popoverController: PopoverController) {}

  ngOnInit() {}

  async compartirComidaEnRedes(ev: any, comidaObj) {
    const popover = await this.popoverController.create({
      component: PopoverCompartirEnRedesComponent,
      event: ev,
      translucent: true,
      componentProps: {
        comida: comidaObj
      }
    });
    return await popover.present();
  }


  cerrarPopover() {

    this.popoverController.dismiss();
  }

  especificacionesAvanzadasToggle() {
    if (this.especificacionesAvanzadas === false) {
      this.especificacionesAvanzadas = true;
      this.iconoEspecificacionesAvanzadas = 'chevron-down-outline';
    } else {
      this.especificacionesAvanzadas = false;
      this.iconoEspecificacionesAvanzadas = 'chevron-forward-outline';
    }
  }

  macronutrientesToggle() {
    if (this.macronutrientes === false) {
      this.macronutrientes = true;
      this.iconoMacronutrientes = 'chevron-down-outline';
    } else {
      this.macronutrientes = false;
      this.iconoMacronutrientes = 'chevron-forward-outline';
    }

  }

  micronutrientesToggle() {
    if (this.micronutrientes === false) {
      this.micronutrientes = true;
      this.iconoMicronutrientes = 'chevron-down-outline';
    } else {
      this.micronutrientes = false;
      this.iconoMicronutrientes = 'chevron-forward-outline';
    }
    
  }

}
