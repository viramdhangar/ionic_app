import { TestBed } from '@angular/core/testing';

import { SwitchteamService } from './switchteam.service';

describe('SwitchteamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwitchteamService = TestBed.get(SwitchteamService);
    expect(service).toBeTruthy();
  });
});
