import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { PopoverController } from '@ionic/angular';
import { PopoverRegistroComponent } from '../popover-registro/popover-registro.component';
import { PopoverRecuperarContrasenaComponent } from '../popover-recuperar-contrasena/popover-recuperar-contrasena.component';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  email: string;
  contrasena: string;

  constructor(private autenticacion: AuthenticationService, public popover: PopoverController) { 
   
  }

  ngOnInit() {
  }

  iniciarSesion() {
    this.autenticacion.login(this.email, this.contrasena);
    this.email = '';
    this.contrasena = '';
  }

  recuperarContrasena() {
    this.popoverRecuperarContrasena(null);
    this.email = '';
    this.contrasena = '';
  }

  registrarse() {
    this.popoverRegistrarUsuario(null);
    this.email = '';
    this.contrasena = '';
  }

  async popoverRegistrarUsuario(ev: any) {
    const popover = await this.popover.create({
      component: PopoverRegistroComponent,
      event: ev,
      
    });
    return await popover.present();
  }

  async popoverRecuperarContrasena(ev: any) {
    const popover = await this.popover.create({
      component: PopoverRecuperarContrasenaComponent,
      event: ev,
      
    });
    return await popover.present();
  }

}
