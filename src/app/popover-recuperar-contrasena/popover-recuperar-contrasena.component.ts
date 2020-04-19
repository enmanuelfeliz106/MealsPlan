import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-popover-recuperar-contrasena',
  templateUrl: './popover-recuperar-contrasena.component.html',
  styleUrls: ['./popover-recuperar-contrasena.component.scss'],
})
export class PopoverRecuperarContrasenaComponent implements OnInit {

  email: string;

  constructor(private autenticacion: AuthenticationService) { }

  ngOnInit() {}

  recuperarContrasena() {
    this.autenticacion.recuperarContrasena(this.email);
  }

}
