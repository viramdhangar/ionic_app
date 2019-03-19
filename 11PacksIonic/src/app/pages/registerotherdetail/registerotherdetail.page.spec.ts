import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterotherdetailPage } from './registerotherdetail.page';

describe('RegisterotherdetailPage', () => {
  let component: RegisterotherdetailPage;
  let fixture: ComponentFixture<RegisterotherdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterotherdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterotherdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
