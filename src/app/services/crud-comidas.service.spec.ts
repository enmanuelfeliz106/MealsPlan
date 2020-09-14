import { TestBed } from '@angular/core/testing';

import { CRUDComidasService } from './crud-comidas.service';

describe('CRUDComidasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CRUDComidasService = TestBed.get(CRUDComidasService);
    expect(service).toBeTruthy();
  });
});
