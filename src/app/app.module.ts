import { PopoverRegistroComponent } from './popover-registro/popover-registro.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule} from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PopoverAgregarComidaComponent } from './popover-agregar-comida/popover-agregar-comida.component';
import { PopoverTablaMedidasComponent } from './popover-tabla-medidas/popover-tabla-medidas.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopoverComponent } from './popover/popover.component';
import { MenuComponent } from './menu/menu.component';








@NgModule({
  declarations: [
    MenuComponent,
    AppComponent,
    PopoverTablaMedidasComponent,
    PopoverComponent,
    PopoverAgregarComidaComponent,
    ],
  exports: [
  ],
  entryComponents: [MenuComponent, PopoverTablaMedidasComponent, PopoverComponent, PopoverAgregarComidaComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFirestoreModule,
            CommonModule,
            FormsModule

          ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    { provide: LOCALE_ID, useValue: 'zh-CN'},

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
