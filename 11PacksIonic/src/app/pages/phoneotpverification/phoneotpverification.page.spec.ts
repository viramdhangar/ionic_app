import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneotpverificationPage } from './phoneotpverification.page';

describe('PhoneotpverificationPage', () => {
  let component: PhoneotpverificationPage;
  let fixture: ComponentFixture<PhoneotpverificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneotpverificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneotpverificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
