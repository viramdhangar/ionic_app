import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchteamPage } from './switchteam.page';

describe('SwitchteamPage', () => {
  let component: SwitchteamPage;
  let fixture: ComponentFixture<SwitchteamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchteamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchteamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
