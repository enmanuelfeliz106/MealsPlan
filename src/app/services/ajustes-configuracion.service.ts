import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AjustesConfiguracionService {

  darkMode: boolean;
  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }
}
