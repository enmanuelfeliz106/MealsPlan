import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverRecuperarContrasenaComponent } from './popover-recuperar-contrasena.component';

describe('PopoverRecuperarContrasenaComponent', () => {
  let component: PopoverRecuperarContrasenaComponent;
  let fixture: ComponentFixture<PopoverRecuperarContrasenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverRecuperarContrasenaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverRecuperarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
