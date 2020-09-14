import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BienvenidaAnimadaPage } from './bienvenida-animada.page';

const routes: Routes = [
  {
    path: '',
    component: BienvenidaAnimadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BienvenidaAnimadaPageRoutingModule {}
