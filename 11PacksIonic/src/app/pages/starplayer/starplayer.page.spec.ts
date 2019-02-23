import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarplayerPage } from './starplayer.page';

describe('StarplayerPage', () => {
  let component: StarplayerPage;
  let fixture: ComponentFixture<StarplayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarplayerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarplayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
