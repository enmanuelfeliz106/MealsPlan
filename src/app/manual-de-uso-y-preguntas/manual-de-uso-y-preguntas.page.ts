import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-manual-de-uso-y-preguntas',
  templateUrl: './manual-de-uso-y-preguntas.page.html',
  styleUrls: ['./manual-de-uso-y-preguntas.page.scss'],
})
export class ManualDeUsoYPreguntasPage implements OnInit {
  select;

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  irAtras() {
    this.nav.back();
 }

}
