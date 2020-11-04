import { PopoverController, AlertController } from '@ionic/angular';
import { Component, OnInit} from '@angular/core';
import { CRUDComidasService } from '../services/crud-comidas.service';

@Component({
  selector: 'app-popover-agregar-comida',
  templateUrl: './popover-agregar-comida.component.html',
  styleUrls: ['./popover-agregar-comida.component.scss']
})


export class PopoverAgregarComidaComponent implements OnInit {
  mensajeError = '';
  tieneComa: boolean;
  comida: string;
  nombre: string;
  ingredientes: string;
  notas: string;
  calorias: number;
  /*Macronutrientes*/
  carbohidratos: number; proteinas: number; grasas: number;
  /*Micronutrientes*/
  /*Vitaminas*/
  vitaminaA: number; vitaminaB1: number; vitaminaB2: number; vitaminaB3: number; vitaminaB5: number;
  vitaminaB6: number; vitaminaB7B8: number; vitaminaB9: number; vitaminaB12: number; vitaminaC: number;
  vitaminaD: number; vitaminaE: number; vitaminaK: number;
  /*Minerales*/
  potasio: number; cloro: number; sodio: number; calcio: number; fosforo: number; magnesio: number;
  hierro: number; zinc: number; manganeso: number; cobre: number; yodo: number; cromo: number; molibdeno: number;
  selenio: number; cobalto: number;

  botonAgregar: boolean;
  titulo;
  fechaLocal;
  opcion;
  fecha;
  docId;
  especificacionesAvanzadas = false;
  macronutrientes = false;
  micronutrientes = false;
  iconoEspecificacionesAvanzadas = 'chevron-forward-outline';
  iconoMacronutrientes = 'chevron-forward-outline';
  iconoMicronutrientes = 'chevron-forward-outline';

  constructor(private popover: PopoverController, public alerta: AlertController, private crud: CRUDComidasService) {
    this.botonAgregar = false;
   }

  ngOnInit() { }

  validarComas(ingredientes: string) {

    let ing = new String(ingredientes);

    for (let i = 0; i < this.ingredientes.length; i++) {
      if (ing.charAt(i) === ',') {
        this.tieneComa = true;
        break;
      } else {
        this.tieneComa = false;
      }
    }
  }

  agregarOActualizarComida(opcion: string, fecha: string, idDoc, comida: string, nombre: string, ingredientes: string,
                           notas: string, calorias: number, carbohidratos: number, proteinas: number, grasas: number,
                           vitaminaA: number, vitaminaB1: number, vitaminaB2: number, vitaminaB3: number, vitaminaB5: number,
                           vitaminaB6: number, vitaminaB7B8: number, vitaminaB9: number, vitaminaB12: number, vitaminaC: number,
                           vitaminaD: number, vitaminaE: number, vitaminaK: number, potasio: number, cloro: number, sodio: number,
                           calcio: number, fosforo: number, magnesio: number, hierro: number, zinc: number, manganeso: number,
                           cobre: number, yodo: number, cromo: number, molibdeno: number,
                           selenio: number, cobalto: number) {

    this.mensajeError = '';

    if (opcion === 'agregar') {
      this.validarComas(this.ingredientes);
    } else {
      this.validarComas(ingredientes);
    }

    if (this.comida === '') {
      this.mensajeError = 'No has elegido la comida, por favor selecciona una';

    } else if (this.nombre === '') {
      this.mensajeError = 'No has puesto nombre a tu comida.';

    } else if (this.ingredientes === '') {
      this.mensajeError = 'No has indicado los ingredientes de tu comida';

    } else if (this.tieneComa === false) {
      this.mensajeError = 'Por favor, divida los ingredientes por comas.';

    } else {

      if (opcion === 'agregar') {

      this.crud.agregarComida(fecha, this.comida, this.nombre, this.ingredientes, this.notas, this.calorias,
                              this.carbohidratos, this.proteinas, this.grasas, this.vitaminaA, this.vitaminaB1,
                              this.vitaminaB2, this.vitaminaB3, this.vitaminaB5, this.vitaminaB6, this.vitaminaB7B8,
                              this.vitaminaB9, this.vitaminaB12, this.vitaminaC, this.vitaminaD, this.vitaminaE, this.vitaminaK,
                              this.potasio, this.cloro, this.sodio, this.calcio, this.fosforo, this.magnesio, this.hierro, this.zinc,
                              this.manganeso, this.cobre, this.yodo, this.cromo, this.molibdeno, this.selenio, this.cobalto
                              );

      } else {
        this.crud.actualizarComida(idDoc, comida, nombre, ingredientes, notas, calorias, carbohidratos, proteinas,
                                   grasas, vitaminaA, vitaminaB1, vitaminaB2, vitaminaB3, vitaminaB5, vitaminaB6,
                                   vitaminaB7B8, vitaminaB9, vitaminaB12, vitaminaC, vitaminaD, vitaminaE, vitaminaK,
                                   potasio, cloro, sodio, calcio, fosforo, magnesio, hierro, zinc, manganeso, cobre,
                                   yodo, cromo, molibdeno, selenio, cobalto);
      }

    }

    this.botonAgregar = true;
    setTimeout(exito => {this.botonAgregar = false; }, 2000);
  }

  cerrarPopover() {
    this.comida = '';
    this.nombre = '';
    this.ingredientes = '';
    this.notas = '';
    this.calorias = null;
    this.carbohidratos = null;
    this.proteinas = null;
    this.grasas = null;
    this.carbohidratos = null; this.proteinas = null; this.grasas = null; this.vitaminaA = null; this.vitaminaB1 = null;
    this.vitaminaB2 = null; this.vitaminaB3 = null; this.vitaminaB5 = null; this.vitaminaB6 = null; this.vitaminaB7B8 = null;
    this.vitaminaB9 = null; this.vitaminaB12 = null; this.vitaminaC = null; this.vitaminaD = null; this.vitaminaE = null;
    this.vitaminaK = null; this.potasio = null; this.cloro = null; this.sodio = null; this.calcio = null; this.fosforo = null;
    this.magnesio = null; this.hierro = null; this.zinc = null; this.manganeso = null; this.cobre = null; this.yodo = null;
    this.cromo = null; this.molibdeno = null; this.selenio = null; this.cobalto = null;

    this.popover.dismiss();
  }

  especificacionesAvanzadasToggle() {
    if (this.especificacionesAvanzadas === false) {
      this.especificacionesAvanzadas = true;
      this.iconoEspecificacionesAvanzadas = 'chevron-down-outline';
    } else {
      this.especificacionesAvanzadas = false;
      this.iconoEspecificacionesAvanzadas = 'chevron-forward-outline';
    }
  }

  macronutrientesToggle() {
    if (this.macronutrientes === false) {
      this.macronutrientes = true;
      this.iconoMacronutrientes = 'chevron-down-outline';
    } else {
      this.macronutrientes = false;
      this.iconoMacronutrientes = 'chevron-forward-outline';
    }

  }

  micronutrientesToggle() {
    if (this.micronutrientes === false) {
      this.micronutrientes = true;
      this.iconoMicronutrientes = 'chevron-down-outline';
    } else {
      this.micronutrientes = false;
      this.iconoMicronutrientes = 'chevron-forward-outline';
    }
  }

}
