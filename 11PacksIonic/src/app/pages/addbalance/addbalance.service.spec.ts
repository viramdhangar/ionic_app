import { TestBed } from '@angular/core/testing';

import { AddbalanceService } from './addbalance.service';

describe('AddbalanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddbalanceService = TestBed.get(AddbalanceService);
    expect(service).toBeTruthy();
  });
});
