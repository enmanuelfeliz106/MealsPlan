import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComidasFavoritasPage } from './comidas-favoritas.page';

const routes: Routes = [
  {
    path: '',
    component: ComidasFavoritasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComidasFavoritasPageRoutingModule {}
