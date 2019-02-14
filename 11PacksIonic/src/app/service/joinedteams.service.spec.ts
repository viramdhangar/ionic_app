import { TestBed } from '@angular/core/testing';

import { JoinedteamsService } from './joinedteams.service';

describe('JoinedteamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JoinedteamsService = TestBed.get(JoinedteamsService);
    expect(service).toBeTruthy();
  });
});
