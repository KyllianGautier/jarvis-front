import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceActivationComponent } from './device-activation.component';

describe('DeviceActivationComponent', () => {
  let component: DeviceActivationComponent;
  let fixture: ComponentFixture<DeviceActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceActivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
