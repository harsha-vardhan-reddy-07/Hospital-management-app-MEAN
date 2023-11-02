import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';



export interface Appointment {
  _id: string;
  name: string;
  patient: string;
  doctor: string;
  timeSlot: string;
  // aprroved: string;
  status:'pending'| 'approved'| 'rejected'
  meetingDetails:string;
}

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  appointments: Appointment[]|any;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    // Assuming you have an AppointmentService to fetch the appointments from the server
    this.appointmentService.getAllAppointments().subscribe(
      appointments => {
        this.appointments = appointments;
        console.log(this.appointments)
      },
      error => {
        console.error('Error loading appointments:', error);
      }
    );
  }

  approveAppointment(appointmentId: string) {
    this.appointmentService.approveAppointment(appointmentId).subscribe(
      response => {
        // Update the status of the appointment locally
        const appointment = this.appointments.find((a: { _id: string; }) => a._id === appointmentId);
        if (appointment) {
          appointment.status = 'approved';
        }

        // Save the updated status to the database
        this.appointmentService.updateAppointmentStatus(appointmentId, 'approved').subscribe(
          updatedAppointment => {
            console.log('Appointment status updated:', updatedAppointment);
          },
          error => {
            console.error('Error updating appointment status:', error);
          }
        );
      },
      error => {
        console.error('Error approving appointment:', error);
      }
    );
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // rejectAppointment(appointmentId: string) {
  //   this.appointmentService.rejectAppointment(appointmentId).subscribe(
  //     response => {
  //       // Update the status of the appointment locally
  //       const appointment = this.appointments.find(a => a._id === appointmentId);
  //       if (appointment) {
  //         appointment.status = 'rejected';
  //       }
  //     },
  //     error => {
  //       console.error('Error rejecting appointment:', error);
  //     }
  //   );
  // }
}
