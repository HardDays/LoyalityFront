/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClientLoyaltyComponent } from './client-loyalty.component';

describe('ClientLoyaltyComponent', () => {
  let component: ClientLoyaltyComponent;
  let fixture: ComponentFixture<ClientLoyaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientLoyaltyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLoyaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
