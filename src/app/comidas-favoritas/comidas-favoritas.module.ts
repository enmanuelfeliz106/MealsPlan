import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComidasFavoritasPageRoutingModule } from './comidas-favoritas-routing.module';

import { ComidasFavoritasPage } from './comidas-favoritas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComidasFavoritasPageRoutingModule
  ],
  declarations: [ComidasFavoritasPage]
})
export class ComidasFavoritasPageModule {}
