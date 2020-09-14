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

}
