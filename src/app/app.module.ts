import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { PopoverAgregarComidaComponent } from './popover-agregar-comida/popover-agregar-comida.component';








@NgModule({
  declarations: [
    AppComponent
    ],
  exports: [
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), 
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFirestoreModule,
            
          ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    { provide: LOCALE_ID, useValue: 'zh-CN'},
    Firebase,
    FirebaseAuthentication
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
