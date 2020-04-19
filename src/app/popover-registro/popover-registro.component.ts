import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-popover-registro',
  templateUrl: './popover-registro.component.html',
  styleUrls: ['./popover-registro.component.scss'],
})
export class PopoverRegistroComponent implements OnInit {

  email: string;
  contrasena: string;
  confirmarContrasena: string;

  constructor(private autenticacion: AuthenticationService) { }

  ngOnInit() {}

  registrarUsuario() {
    if (this.contrasena === this.confirmarContrasena) {
      this.autenticacion.registrarUsuario(this.email, this.contrasena);
    } else {
      if ($('#registro p').html() === '') {
        $('#registro p').append('La confirmación de contraseña no coincide. Vuelve a intentar').css('color', 'red');
      } else {
        
      }
      
      
    }
    
  }

}
