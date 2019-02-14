import { TestBed } from '@angular/core/testing';

import { MyjoinedleaguesService } from './myjoinedleagues.service';

describe('MyjoinedleaguesserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyjoinedleaguesService = TestBed.get(MyjoinedleaguesService);
    expect(service).toBeTruthy();
  });
});
