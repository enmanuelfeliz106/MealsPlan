import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { PopoverRegistroComponent } from '../popover-registro/popover-registro.component';
import { PopoverRecuperarContrasenaComponent } from '../popover-recuperar-contrasena/popover-recuperar-contrasena.component';

@NgModule({
  entryComponents: [PopoverRegistroComponent, PopoverRecuperarContrasenaComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule
  ],
  declarations: [InicioPage, PopoverRegistroComponent, PopoverRecuperarContrasenaComponent]
})
export class InicioPageModule {}
