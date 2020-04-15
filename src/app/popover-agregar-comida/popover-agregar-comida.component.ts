import { Component, OnInit} from '@angular/core';
import { CalendarioPage } from '../calendario/calendario.page';


@Component({
  selector: 'app-popover-agregar-comida',
  templateUrl: './popover-agregar-comida.component.html',
  styleUrls: ['./popover-agregar-comida.component.scss'],
})
export class PopoverAgregarComidaComponent implements OnInit {

  comida: string;
  nombre: string;
  ingredientes: string;
  notas: string;
  calorias: number;

  constructor() {

   }

  ngOnInit() {
    
  }


}
