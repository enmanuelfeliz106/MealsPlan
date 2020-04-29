import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { CRUDComidasService } from '../services/crud-comidas.service';

@Component({
  selector: 'app-comidas-favoritas',
  templateUrl: './comidas-favoritas.page.html',
  styleUrls: ['./comidas-favoritas.page.scss'],
})
export class ComidasFavoritasPage implements OnInit {


  comidas = [];

  constructor(public popoverController: PopoverController, private crud: CRUDComidasService, private nav: NavController) {

    this.obtenerComidas();

  }

  irAtras() {
    this.nav.back();
  }

  async presentPopover(ev: any, comida) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      componentProps: {
        comidaObj: comida
      },
      cssClass: 'popover'
      
    });
    return await popover.present();
  }

  obtenerComidas() {

    this.comidas = [];
    this.crud.mostrarComidas('favorita', true);
    this.comidas = this.crud.comidas;

  }

  ngOnInit() {
  }

}
