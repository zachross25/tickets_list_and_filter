import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneLogoComponent } from './plane-logo.component';

describe('PlaneLogoComponent', () => {
  let component: PlaneLogoComponent;
  let fixture: ComponentFixture<PlaneLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaneLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
