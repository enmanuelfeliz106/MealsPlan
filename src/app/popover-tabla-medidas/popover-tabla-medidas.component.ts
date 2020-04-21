import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-tabla-medidas',
  templateUrl: './popover-tabla-medidas.component.html',
  styleUrls: ['./popover-tabla-medidas.component.scss'],
})
export class PopoverTablaMedidasComponent implements OnInit {

  numero = 1;
  medida = 'onzas';
  equivalencias;
  

  constructor(public popover: PopoverController) { }

  ngOnInit() {}

  convertir() {
    if (this.medida === 'onzas') {
      this.equivalencias = [{med: 'gramos', valor: (this.numero * 28.35).toFixed(2)},
                            {med: 'libras', valor: (this.numero * 0.0625).toFixed(2)},
                            {med: 'tazas', valor: (this.numero * 0.125).toFixed(2)},
                            {med: 'cucharadas', valor: (this.numero * 2).toFixed(2)},
                            {med: 'cucharaditas', valor: (this.numero * 6).toFixed(2)},
                            {med: 'pintas', valor: (this.numero * 0.0625).toFixed(2)},
                            {med: 'kilos', valor: (this.numero * 0.0283495).toFixed(2)},
                            {med: 'litros', valor: (this.numero * 0.0295735).toFixed(2)}];

    } else if (this.medida === 'gramos') {
      this.equivalencias = [{med: 'onzas', valor: (this.numero * 0.035274).toFixed(2)},
                            {med: 'libras', valor: (this.numero * 0.00220462).toFixed(2)},
                            {med: 'tazas', valor: (this.numero / 225).toFixed(2)},
                            {med: 'cucharadas', valor: (this.numero / 15).toFixed(2)},
                            {med: 'cucharaditas', valor: (this.numero / 8).toFixed(2)},
                            {med: 'pintas', valor: ((this.numero * 0.035274) * 0.0625).toFixed(2)},
                            {med: 'kilos', valor: (this.numero * 0.001).toFixed(2)}];

    } else if (this.medida === 'libras') {
      this.equivalencias = [{med: 'gramos', valor: (this.numero * 453.592).toFixed(2)},
                            {med: 'onzas', valor: (this.numero * 16).toFixed(2)},
                            {med: 'tazas', valor: ((this.numero * 453.592) / 225 ).toFixed(2)}, // ... a gramos a tazas
                            {med: 'cucharadas', valor: ((this.numero * 453.592) / 15).toFixed(2)},
                            {med: 'cucharaditas', valor: ((this.numero * 453.592) / 8).toFixed(2)},
                            {med: 'pintas', valor: ((this.numero * 16) * 0.0625).toFixed(2)}, // ... a onza a pinta
                            {med: 'kilos', valor: (this.numero * 0.453592).toFixed(2)}];

    } else if (this.medida === 'kilos') {
      this.equivalencias = [{med: 'gramos', valor: (this.numero * 1000).toFixed(2)},
                            {med: 'onzas', valor: (this.numero * 35.274).toFixed(2)},
                            {med: 'libras', valor: (this.numero * 2.20462).toFixed(2)},
                            {med: 'tazas', valor: ((this.numero * 1000) / 225 ).toFixed(2)}, // ... a gramos a taza
                            {med: 'cucharadas', valor: ((this.numero * 1000) / 15).toFixed(2)}, // ... a gramos a cucharada
                            {med: 'cucharaditas', valor: ((this.numero * 1000) / 8).toFixed(2)}, // ... a gramos a cdita
                            {med: 'pintas', valor: ((this.numero * 35.274) * 0.0625).toFixed(2)}, // ... a onza a pinta
                            ];
      
    }  else if (this.medida === 'litros') {
      this.equivalencias = [{med: 'gramos', valor: ((this.numero * 33.814) * 28.35).toFixed(2)}, // a onza a gramos
                            {med: 'onzas', valor: (this.numero * 33.814).toFixed(2)},
                            {med: 'libras', valor: ((this.numero * 33.814) * 0.0625).toFixed(2)}, // a onza a libra
                            {med: 'tazas', valor: ((this.numero * 33.814) * 0.125 ).toFixed(2)}, // ... a onza a taza
                            {med: 'cucharadas', valor: ((this.numero * 33.814) * 2).toFixed(2)}, // ... a onza a cucharada
                            {med: 'cucharaditas', valor: ((this.numero * 33.814) * 6).toFixed(2)}, // ... a onza a cdita
                            {med: 'pintas', valor: ((this.numero * 33.814) * 0.0625).toFixed(2)}, // ... a onza a pinta
                            ];
      
    } else if (this.medida === 'cucharaditas') {
      this.equivalencias = [{med: 'gramos', valor: ((this.numero * 0.166667) * 28.35).toFixed(2)}, // a onza a gramos
                            {med: 'onzas', valor: (this.numero * 0.166667).toFixed(2)},
                            {med: 'libras', valor: ((this.numero * 0.166667) * 0.0625).toFixed(2)}, // a onza a libra
                            {med: 'tazas', valor: ((this.numero * 0.166667) * 0.125 ).toFixed(2)}, // ... a onza a taza
                            {med: 'cucharadas', valor: ((this.numero * 0.166667) * 2).toFixed(2)}, // ... a onza a cucharada
                            {med: 'litros', valor: ((this.numero * 0.166667) * 6).toFixed(2)}, // ... a onza a cdita
                            {med: 'pintas', valor: ((this.numero * 0.166667) * 0.0625).toFixed(2)}, // ... a onza a pinta
                            ];
      
    }  else if (this.medida === 'cucharadas') {
      this.equivalencias = [{med: 'gramos', valor: ((this.numero * 0.5) * 28.35).toFixed(2)}, // a onza a gramos
                            {med: 'onzas', valor: (this.numero * 0.5).toFixed(2)},
                            {med: 'libras', valor: ((this.numero * 0.5) * 0.0625).toFixed(2)}, // a onza a libra
                            {med: 'tazas', valor: ((this.numero * 0.5) * 0.125 ).toFixed(2)}, // ... a onza a taza
                            {med: 'cucharaditas', valor: (this.numero * 3).toFixed(2)}, 
                            {med: 'litros', valor: ((this.numero * 0.5) * 6).toFixed(2)}, // ... a onza a cdita
                            {med: 'pintas', valor: ((this.numero * 0.5) * 0.0625).toFixed(2)}, // ... a onza a pinta
                            ];
      
    } else if (this.medida === 'tazas') {
      this.equivalencias = [{med: 'gramos', valor: ((this.numero * 8.11537) * 28.35).toFixed(2)}, // a onza a gramos
                            {med: 'onzas', valor: (this.numero * 8.11537).toFixed(2)},
                            {med: 'libras', valor: ((this.numero * 8.11537) * 0.0625).toFixed(2)}, // a onza a libra
                            {med: 'cucharadita', valor: ((this.numero * 8.11537) * 6).toFixed(2)}, // ... a onza a taza
                            {med: 'cucharadas', valor: ((this.numero * 8.11537) * 2).toFixed(2)}, // ... a onza a cucharada
                            {med: 'litros', valor: ((this.numero * 8.11537) * 6).toFixed(2)}, // ... a onza a cdita
                            {med: 'pintas', valor: ((this.numero * 8.11537) * 0.0625).toFixed(2)}, // ... a onza a pinta
                            ];
      
    } else if (this.medida === 'pinta') {
      this.equivalencias = [{med: 'gramos', valor: ((this.numero * 16) * 28.35).toFixed(2)}, // a onza a gramos
                            {med: 'onzas', valor: (this.numero * 16).toFixed(2)},
                            {med: 'libras', valor: ((this.numero * 16) * 0.0625).toFixed(2)}, // a onza a libra
                            {med: 'tazas', valor: ((this.numero * 16) * 0.125 ).toFixed(2)}, // ... a onza a taza
                            {med: 'cucharadas', valor: ((this.numero * 16) * 2).toFixed(2)}, // ... a onza a cucharada
                            {med: 'litros', valor: ((this.numero * 16) * 6).toFixed(2)}, // ... a onza a cdita
                            {med: 'cucharadita', valor: ((this.numero * 16) * 6).toFixed(2)}, // ... a onza a pinta
                            ];
      
    } else {
      console.log('Error...');

    }
    
    
  }

  cerrarPopover() {
    this.popover.dismiss();
  }

}
