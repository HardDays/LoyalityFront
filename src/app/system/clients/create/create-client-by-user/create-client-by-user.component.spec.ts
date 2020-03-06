/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateClientByUserComponent } from './create-client-by-user.component';

describe('CreateClientByUserComponent', () => {
  let component: CreateClientByUserComponent;
  let fixture: ComponentFixture<CreateClientByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateClientByUserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
