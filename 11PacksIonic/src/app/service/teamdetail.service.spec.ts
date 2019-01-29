import { TestBed } from '@angular/core/testing';

import { TeamdetailService } from './teamdetail.service';

describe('TeamdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamdetailService = TestBed.get(TeamdetailService);
    expect(service).toBeTruthy();
  });
});
