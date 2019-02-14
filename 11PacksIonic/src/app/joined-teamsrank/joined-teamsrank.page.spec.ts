import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedTeamsrankPage } from './joined-teamsrank.page';

describe('JoinedTeamsrankPage', () => {
  let component: JoinedTeamsrankPage;
  let fixture: ComponentFixture<JoinedTeamsrankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedTeamsrankPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedTeamsrankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
