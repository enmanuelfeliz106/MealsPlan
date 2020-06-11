import { AjustesConfiguracionService } from './../services/ajustes-configuracion.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})

export class AjustesPage implements OnInit {


  constructor(private nav: NavController, private auth: AuthenticationService, private config: AjustesConfiguracionService) {

   }

  ngOnInit() {
  }

  irAtras() {
      this.nav.back();
   }

  borrarCuenta() {
    this.auth.eliminarCuenta();
  }


}
