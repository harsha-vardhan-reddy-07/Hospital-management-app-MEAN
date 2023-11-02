import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../Appointment';
import { Observable } from 'rxjs';


export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  contact: string;
  // Other doctor fields
}


@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {
  bookingForm: FormGroup;
  doctors: Doctor[]|any; // Define an Observable to hold the list of doctors
  // bsConfig: Partial<BsDatepickerConfig>; // Partial type to customize the datepicker configuration



  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService) {
    this.bookingForm = this.formBuilder.group({
      name: ['', Validators.required],
      doctor: ['', Validators.required],
      timeSlot: ['', Validators.required]
    });
    // this.bsConfig = {
    //   showWeekNumbers: false,
    //   containerClass: 'theme-default', // Optional CSS class for the datepicker container
    //   dateInputFormat: 'YYYY-MM-DDTHH:mm:ss' // Date format for the selected value
    // };
  }

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      name: ['', Validators.required],
      doctor: ['', Validators.required],
      timeSlot: ['', Validators.required]
    });

    this.doctors = this.appointmentService.getDoctorsByDoctorName(this.doctors); // Fetch the list of doctors by name
  }

  bookAppointment() {
    if (this.bookingForm.invalid) {
      return;
    }

    const appointmentData = this.bookingForm.value;
    const appointment: Appointment = { ...appointmentData };

    this.appointmentService.bookAppointment(appointment)
      .subscribe(
        (response: any) => {
          alert("Appointment booked successfully");
          console.log('Appointment booked successfully', response);
          // Reset the form or perform any other necessary actions
        },
        (error: any) => {
          console.error('Failed to book appointment', error);
          // Handle error appropriately
        }
      );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
