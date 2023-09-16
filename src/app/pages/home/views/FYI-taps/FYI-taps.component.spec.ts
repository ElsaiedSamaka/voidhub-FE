/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FYITapsComponent } from './FYI-taps.component';

describe('FYITapsComponent', () => {
  let component: FYITapsComponent;
  let fixture: ComponentFixture<FYITapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FYITapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FYITapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
