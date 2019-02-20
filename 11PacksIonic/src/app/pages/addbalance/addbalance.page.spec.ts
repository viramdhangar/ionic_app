import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbalancePage } from './addbalance.page';

describe('AddbalancePage', () => {
  let component: AddbalancePage;
  let fixture: ComponentFixture<AddbalancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbalancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
