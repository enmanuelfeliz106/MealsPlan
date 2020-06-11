import { TestBed } from '@angular/core/testing';

import { AjustesConfiguracionService } from './ajustes-configuracion.service';

describe('AjustesConfiguracionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AjustesConfiguracionService = TestBed.get(AjustesConfiguracionService);
    expect(service).toBeTruthy();
  });
});
