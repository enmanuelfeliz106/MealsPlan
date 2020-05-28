import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BienvenidaAnimadaPageRoutingModule } from './bienvenida-animada-routing.module';

import { BienvenidaAnimadaPage } from './bienvenida-animada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BienvenidaAnimadaPageRoutingModule
  ],
  declarations: [BienvenidaAnimadaPage]
})
export class BienvenidaAnimadaPageModule {}
