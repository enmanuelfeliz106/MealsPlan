import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualDeUsoYPreguntasPage } from './manual-de-uso-y-preguntas.page';

const routes: Routes = [
  {
    path: '',
    component: ManualDeUsoYPreguntasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualDeUsoYPreguntasPageRoutingModule {}
