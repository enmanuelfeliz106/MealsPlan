import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { PopoverController, MenuController } from '@ionic/angular';
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
  constructor(public popover: PopoverController, private menu: MenuController, private router: Router) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.login = true;
      } else {
        // No user is signed in.
        this.login = false;
      }
    });
    
   }

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

  cerrarMenu() {
    this.menu.close();
    
  }

  cerrarSesion() {
    this.menu.close();
    firebase.auth().signOut().then((exito) => {
      this.router.navigate(['/inicio']);
    });
    
  }

  
 

}

