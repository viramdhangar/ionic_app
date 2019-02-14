import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedmatchesPage } from './joinedmatches.page';

describe('JoinedmatchesPage', () => {
  let component: JoinedmatchesPage;
  let fixture: ComponentFixture<JoinedmatchesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedmatchesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedmatchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
