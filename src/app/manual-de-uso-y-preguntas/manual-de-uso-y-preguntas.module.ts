import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualDeUsoYPreguntasPageRoutingModule } from './manual-de-uso-y-preguntas-routing.module';

import { ManualDeUsoYPreguntasPage } from './manual-de-uso-y-preguntas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualDeUsoYPreguntasPageRoutingModule
  ],
  declarations: [ManualDeUsoYPreguntasPage]
})
export class ManualDeUsoYPreguntasPageModule {}
