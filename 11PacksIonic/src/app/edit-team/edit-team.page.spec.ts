import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamPage } from './edit-team.page';

describe('EditTeamPage', () => {
  let component: EditTeamPage;
  let fixture: ComponentFixture<EditTeamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTeamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
