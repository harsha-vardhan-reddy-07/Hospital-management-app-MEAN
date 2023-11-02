import { Component } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PrescriptionService } from '../prescription.service';


export interface Patient{
  _id:string;
  name:string;
  age:number;
  gender:string;
  contact:string;
}


export interface Appointment {
  _id: string;
  name: string;
  patient: string;
  doctor: string;
  timeSlot: string;
  // approved: string;
  status: 'pending' | 'approved' | 'rejected';
  meetingDetails: string;
}

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent {
  appointments: Appointment[] | any;
  userId!: string;
  username: string | any;
  password: string | any;
  role: string | any;

  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn

  prescriptions: any[] = [];
  patientName: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private prescriptionService: PrescriptionService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this._isLoggedIn = true;
    }
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this._isLoggedIn = true;
      this.role = localStorage.getItem('role'); // Retrieve the role from the localStorage

      // Check if the user is logged in
      if (this.authService.isLoggedIn()) {
        const userId = this.authService.getUserId(); // Retrieve the userId from the service

        // Navigate to the patient dashboard component only if it's the initial navigation after login
        if (!this.route.snapshot.queryParams['userId']) {
          this.router.navigate(['/patientdashboard'], { queryParams: { userId } });
          return; // Return early to prevent executing the code below
        }
      }

      this.loadAppointments(); // Load appointments for the logged-in patient
    }
  }



  approveAppointment(appointmentId: string) {
    this.appointmentService.approveAppointment(appointmentId).subscribe(
      response => {
        // Update the status of the appointment locally
        const appointment = this.appointments.find((a: { _id: string }) => a._id === appointmentId);
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

  loadAppointments() {
    // Assuming you have an AppointmentService to fetch the appointments from the server
    this.appointmentService.getAllAppointments().subscribe(
      appointments => {
        this.appointments = appointments;
        console.log(this.appointments);
      },
      error => {
        console.error('Error loading appointments:', error);
      }
    );
  }

  searchPrescriptionsByPatientName() {
    if (this.patientName.trim() !== '') {
      this.prescriptionService.getPrescriptionsByPatientName(this.patientName).subscribe(
        prescriptions => {
          this.prescriptions = prescriptions;
        },
        error => {
          console.error('Error fetching prescriptions:', error);
        }
      );
    }
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
