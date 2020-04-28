import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HistorialComidasPageRoutingModule } from './historial-comidas-routing.module';
import { HistorialComidasPage } from './historial-comidas.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialComidasPageRoutingModule
  ],
  declarations: [HistorialComidasPage],
  entryComponents: [],
})
export class HistorialComidasPageModule {}
