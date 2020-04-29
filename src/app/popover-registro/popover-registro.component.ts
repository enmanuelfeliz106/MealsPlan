import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-popover-registro',
  templateUrl: './popover-registro.component.html',
  styleUrls: ['./popover-registro.component.scss'],
})
export class PopoverRegistroComponent implements OnInit {

  email: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  mensajeError = '';

  constructor(private autenticacion: AuthenticationService) { }

  ngOnInit() {}

  registrarUsuario() {
    this.mensajeError = '';

    if (this.email === '' || this.contrasena === '' || this.confirmarContrasena === '') {
      this.mensajeError = 'Todos los campos son necesarios. Por favor complete el formulario.';

    } else if (this.contrasena !== this.confirmarContrasena) {
      this.mensajeError = 'La confirmación de contraseña no coincide. Deben ser iguales.'; 

    } else {
      this.autenticacion.registrarUsuario(this.email, this.contrasena);
    }
    
  }

}
