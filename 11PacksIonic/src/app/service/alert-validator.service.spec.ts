import { TestBed } from '@angular/core/testing';

import { AlertValidatorService } from './alert-validator.service';

describe('AlertValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertValidatorService = TestBed.get(AlertValidatorService);
    expect(service).toBeTruthy();
  });
});
