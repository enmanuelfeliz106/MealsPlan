import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistorialComidasPage } from './historial-comidas.page';

describe('HistorialComidasPage', () => {
  let component: HistorialComidasPage;
  let fixture: ComponentFixture<HistorialComidasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialComidasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialComidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
