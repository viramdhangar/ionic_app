import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabs1Page } from './tabs1.page';

describe('Tabs1Page', () => {
  let component: Tabs1Page;
  let fixture: ComponentFixture<Tabs1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tabs1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tabs1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
