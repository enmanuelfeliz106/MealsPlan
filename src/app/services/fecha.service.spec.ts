import { TestBed } from '@angular/core/testing';

import { FechaService } from './fecha.service';

describe('FechaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FechaService = TestBed.get(FechaService);
    expect(service).toBeTruthy();
  });
});
