import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasypointsystemPage } from './fantasypointsystem.page';

describe('FantasypointsystemPage', () => {
  let component: FantasypointsystemPage;
  let fixture: ComponentFixture<FantasypointsystemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FantasypointsystemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FantasypointsystemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
