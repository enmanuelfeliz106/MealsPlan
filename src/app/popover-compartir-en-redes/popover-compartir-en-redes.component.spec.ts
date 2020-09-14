import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverCompartirEnRedesComponent } from './popover-compartir-en-redes.component';

describe('PopoverCompartirEnRedesComponent', () => {
  let component: PopoverCompartirEnRedesComponent;
  let fixture: ComponentFixture<PopoverCompartirEnRedesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverCompartirEnRedesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverCompartirEnRedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
