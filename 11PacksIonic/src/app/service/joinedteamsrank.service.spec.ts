import { TestBed } from '@angular/core/testing';

import { JoinedteamsrankService } from './joinedteamsrank.service';

describe('JoinedteamsrankService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JoinedteamsrankService = TestBed.get(JoinedteamsrankService);
    expect(service).toBeTruthy();
  });
});
