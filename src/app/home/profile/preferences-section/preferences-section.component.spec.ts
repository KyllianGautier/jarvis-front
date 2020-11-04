import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesSectionComponent } from './preferences-section.component';

describe('PreferencesSectionComponent', () => {
  let component: PreferencesSectionComponent;
  let fixture: ComponentFixture<PreferencesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferencesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
