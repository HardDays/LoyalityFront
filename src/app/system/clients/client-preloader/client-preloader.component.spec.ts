import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPreloaderComponent } from './client-preloader.component';

describe('ClientPreloaderComponent', () => {
  let component: ClientPreloaderComponent;
  let fixture: ComponentFixture<ClientPreloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientPreloaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
