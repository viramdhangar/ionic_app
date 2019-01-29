import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamdetailPage } from './teamdetail.page';

describe('TeamdetailPage', () => {
  let component: TeamdetailPage;
  let fixture: ComponentFixture<TeamdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
