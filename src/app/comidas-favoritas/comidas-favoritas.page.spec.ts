import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComidasFavoritasPage } from './comidas-favoritas.page';

describe('ComidasFavoritasPage', () => {
  let component: ComidasFavoritasPage;
  let fixture: ComponentFixture<ComidasFavoritasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComidasFavoritasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComidasFavoritasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
