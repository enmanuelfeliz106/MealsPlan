import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  date: Date;
  type: 'object';

  constructor() { }

  ngOnInit() {
  }

  onChange($event) {
    console.log($event);
  }


}
