import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { PopoverController } from '@ionic/angular';
import { format} from 'date-fns';

@Component({
  selector: 'app-popover-registro',
  templateUrl: './popover-registro.component.html',
  styleUrls: ['./popover-registro.component.scss'],
})
export class PopoverRegistroComponent implements OnInit {

  email: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  nombre = '';
  apellidos = '';
  sexo = '';
  fechaNacimiento = '';
  hoy = new Date().toString();
  yearMin = new Date().getFullYear() - 110; // la edad maxima de una persona es 100 anios
  yearMax = new Date().getFullYear() - 10; // la edad minima es 10 anios
  mensajeError = '';

  constructor(private autenticacion: AuthenticationService, public popover: PopoverController) { }

  ngOnInit() {}

  registrarUsuario() {
    this.mensajeError = '';

    if (this.email === '' || this.contrasena === '' || this.confirmarContrasena === '' || this.nombre === '' || this.apellidos === '' || this.sexo === '' || this.fechaNacimiento === '') {
      this.mensajeError = 'Todos los campos son necesarios. Por favor complete el formulario.';

    } else if (this.contrasena !== this.confirmarContrasena) {
      this.mensajeError = 'La confirmación de contraseña no coincide. Deben ser iguales.'; 

    } else {
      let fechaNacimientoFormateada = format(new Date(this.fechaNacimiento), 'MM/dd/yyyy');
      this.autenticacion.registrarUsuario(this.email, this.contrasena, this.nombre, this.apellidos, this.sexo, fechaNacimientoFormateada);
    }
    
  }

  cerrarPopover() {

    this.popover.dismiss();
  }

}
