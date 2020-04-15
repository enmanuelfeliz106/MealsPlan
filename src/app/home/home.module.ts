
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PopoverComponent } from '../popover/popover.component';
import { MenuComponent } from '../menu/menu.component';





@NgModule({
  entryComponents:  [PopoverComponent, MenuComponent ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage

      },
    
    ]),

  ],
  declarations: [
    HomePage,
    PopoverComponent,
    MenuComponent,
    
  ]

})
export class HomePageModule {}
