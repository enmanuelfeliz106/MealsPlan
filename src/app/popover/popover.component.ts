import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],

})
export class PopoverComponent implements OnInit {

  comidaObj;

  constructor(public popover: PopoverController) {}

  ngOnInit() {}

  cerrarPopover() {

    this.popover.dismiss();
  }

}
