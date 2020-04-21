import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverTablaMedidasComponent } from './popover-tabla-medidas.component';

describe('PopoverTablaMedidasComponent', () => {
  let component: PopoverTablaMedidasComponent;
  let fixture: ComponentFixture<PopoverTablaMedidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverTablaMedidasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverTablaMedidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
