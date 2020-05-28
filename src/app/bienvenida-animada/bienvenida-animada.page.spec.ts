import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BienvenidaAnimadaPage } from './bienvenida-animada.page';

describe('BienvenidaAnimadaPage', () => {
  let component: BienvenidaAnimadaPage;
  let fixture: ComponentFixture<BienvenidaAnimadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienvenidaAnimadaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BienvenidaAnimadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
