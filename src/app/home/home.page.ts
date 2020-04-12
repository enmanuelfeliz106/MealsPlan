import { Component } from '@angular/core';
import * as $ from 'jquery';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  comidas = [{ posicion: 0, comida: 'Desayuno', descripcion: 'Muy buena comida', checked: false  },
             { posicion: 1, comida: 'Snack Matutino', descripcion: 'Muy buena comida', checked: false   },
             { posicion: 2, comida: 'Almuerzo', descripcion: 'Muy buena comida', checked: false   },
             { posicion: 3, comida: 'Snack Vespertino', descripcion: 'Muy buena comida', checked: false   },
             { posicion: 4, comida: 'Cena', descripcion: 'Muy buena comida', checked: false   }];

  constructor(private popoverController: PopoverController, private menu: MenuController) {}

  public check(posicion: number) {
    if (this.comidas[posicion].checked === false) {
      $("ion-item #check" + posicion).attr("color", "success");
      this.comidas[posicion].checked = true;
    } else {
      $("ion-item #check" + posicion).attr("color", "light");
      this.comidas[posicion].checked = false;
    }

  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  openFirstMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}
