import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialComidasPage } from './historial-comidas.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialComidasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialComidasPageRoutingModule {}
