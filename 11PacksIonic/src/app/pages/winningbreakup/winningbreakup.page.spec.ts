import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinningbreakupPage } from './winningbreakup.page';

describe('WinningbreakupPage', () => {
  let component: WinningbreakupPage;
  let fixture: ComponentFixture<WinningbreakupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinningbreakupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinningbreakupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
