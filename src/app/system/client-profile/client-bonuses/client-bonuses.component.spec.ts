/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClientBonusesComponent } from './client-bonuses.component';

describe('ClientBonusesComponent', () => {
  let component: ClientBonusesComponent;
  let fixture: ComponentFixture<ClientBonusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientBonusesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBonusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
