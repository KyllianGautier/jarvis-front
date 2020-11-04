import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSectionComponent } from './device-section.component';

describe('DeviceSectionComponent', () => {
  let component: DeviceSectionComponent;
  let fixture: ComponentFixture<DeviceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
