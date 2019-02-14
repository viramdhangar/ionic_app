import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyjoinedleaguesPage } from './myjoinedleagues.page';

describe('MyjoinedleaguesPage', () => {
  let component: MyjoinedleaguesPage;
  let fixture: ComponentFixture<MyjoinedleaguesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyjoinedleaguesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyjoinedleaguesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
