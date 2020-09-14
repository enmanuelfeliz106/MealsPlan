import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/bienvenida-animada', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'historial-comidas',
    loadChildren: () => import('./historial-comidas/historial-comidas.module').then( m => m.HistorialComidasPageModule)
  },
  {
    path: 'comidas-favoritas',
    loadChildren: () => import('./comidas-favoritas/comidas-favoritas.module').then( m => m.ComidasFavoritasPageModule)
  },
  {
    path: 'bienvenida-animada',
    loadChildren: () => import('./bienvenida-animada/bienvenida-animada.module').then( m => m.BienvenidaAnimadaPageModule)
  },  {
    path: 'ajustes',
    loadChildren: () => import('./ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'manual-de-uso-y-preguntas',
    loadChildren: () => import('./manual-de-uso-y-preguntas/manual-de-uso-y-preguntas.module').then( m => m.ManualDeUsoYPreguntasPageModule)
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
