import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBookingComponent } from './appointment-booking.component';

describe('AppointmentBookingComponent', () => {
  let component: AppointmentBookingComponent;
  let fixture: ComponentFixture<AppointmentBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentBookingComponent]
    });
    fixture = TestBed.createComponent(AppointmentBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
