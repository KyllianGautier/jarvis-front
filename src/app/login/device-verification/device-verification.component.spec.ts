import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceVerificationComponent } from './device-verification.component';

describe('DeviceVerificationComponent', () => {
  let component: DeviceVerificationComponent;
  let fixture: ComponentFixture<DeviceVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
