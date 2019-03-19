import { TestBed } from '@angular/core/testing';

import { FantasypointsystemService } from './fantasypointsystem.service';

describe('FantasypointsystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FantasypointsystemService = TestBed.get(FantasypointsystemService);
    expect(service).toBeTruthy();
  });
});
