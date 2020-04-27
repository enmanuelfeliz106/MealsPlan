import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-popover-recuperar-contrasena',
  templateUrl: './popover-recuperar-contrasena.component.html',
  styleUrls: ['./popover-recuperar-contrasena.component.scss'],
})
export class PopoverRecuperarContrasenaComponent implements OnInit {

  email: string = '';
  mensajeError = '';

  constructor(private autenticacion: AuthenticationService) { }

  ngOnInit() {}

  recuperarContrasena() {
    this.mensajeError = '';

    if (this.email === '') {
      this.mensajeError = 'Ha dejado el campo vacío, por favor proporcione su email.';

    } else {
      this.autenticacion.recuperarContrasena(this.email);
    }
    
  }

}
