import { Component, OnInit} from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { PopoverController } from '@ionic/angular';
import { PopoverTablaMedidasComponent } from '../popover-tabla-medidas/popover-tabla-medidas.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public popover: PopoverController) { }

  ngOnInit() {}

  async presentPopover(ev: any) {
    const popover = await this.popover.create({
      component: PopoverTablaMedidasComponent,
      event: ev,
      translucent: true,
      cssClass: 'popover'
      
    });
    return await popover.present();
  }

 

}

