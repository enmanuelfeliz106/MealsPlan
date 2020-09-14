import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManualDeUsoYPreguntasPage } from './manual-de-uso-y-preguntas.page';

describe('ManualDeUsoYPreguntasPage', () => {
  let component: ManualDeUsoYPreguntasPage;
  let fixture: ComponentFixture<ManualDeUsoYPreguntasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualDeUsoYPreguntasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManualDeUsoYPreguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
