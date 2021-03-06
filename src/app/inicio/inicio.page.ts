
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { PopoverController, Platform } from '@ionic/angular';
import { PopoverRegistroComponent } from '../popover-registro/popover-registro.component';
import { PopoverRecuperarContrasenaComponent } from '../popover-recuperar-contrasena/popover-recuperar-contrasena.component';
import * as firebase from 'firebase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  subscription;
  email: string;
  contrasena: string;
  botonIniciarSesion: boolean;
  provider = new firebase.auth.GoogleAuthProvider();

  constructor(private autenticacion: AuthenticationService, public popover: PopoverController, private router: Router,
              private platform: Platform) { 
    this.botonIniciarSesion = false;
  }

  ngOnInit() {
  }


  iniciarSesion() {
    this.autenticacion.login(this.email, this.contrasena);
    this.email = '';
    this.contrasena = '';
    this.botonIniciarSesion = true;
    setTimeout(exito => {this.botonIniciarSesion = false; }, 2000);
  }

  recuperarContrasena() {
    this.popoverRecuperarContrasena(null);
    
  }

  registrarse() {
    this.popoverRegistrarUsuario(null);
   
  }

  async popoverRegistrarUsuario(ev: any) {
    const popover = await this.popover.create({
      component: PopoverRegistroComponent,
      event: ev,
      backdropDismiss: false

    });
    return await popover.present();
  }

  async popoverRecuperarContrasena(ev: any) {
    const popover = await this.popover.create({
      component: PopoverRecuperarContrasenaComponent,
      event: ev,
      backdropDismiss: false

    });
    return await popover.present();
  }

  entrarConGoogle() {
    this.autenticacion.loginConGoogle();

  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });
  }
  
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}
