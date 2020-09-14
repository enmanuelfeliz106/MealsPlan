import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-bienvenida-animada',
  templateUrl: './bienvenida-animada.page.html',
  styleUrls: ['./bienvenida-animada.page.scss'],
})
export class BienvenidaAnimadaPage implements OnInit {

  constructor(private router: Router) {
    if (firebase.auth().currentUser) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/inicio']);
    }

   }

  ngOnInit() {
  }

}
