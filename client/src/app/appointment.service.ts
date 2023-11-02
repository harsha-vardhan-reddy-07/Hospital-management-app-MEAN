import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './Appointment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from './appointment-booking/appointment-booking.component';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  private apiUrl = 'http://localhost:3000/appointments/'; // Replace with your server API URL

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }




  getDoctorsByDoctorName(doctorName: string): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3000/doctors`);
  }

  getAvailableDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>('http://localhost:3000/appointments/doctor');
  }

  getAppointmentsByPatientId(patientId: string): Observable<Appointment[]> {
    const url = `${this.apiUrl}/${patientId}`;
    return this.http.get<Appointment[]>(url);
  }


  getAppointmentsByDoctorName(doctorName: string): Observable<Appointment[]> {
    const url = `${this.apiUrl}doctor/${doctorName}`;
    return this.http.get<Appointment[]>(url);
  }

  bookAppointment(appointment: Appointment) {
    return this.http.post(this.apiUrl, appointment);
  }





  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }



  approveAppointment(appointmentId: string): Observable<any> {
    const url = `${this.apiUrl}/${appointmentId}/approve`;
    return this.http.put(url, {});
  }


  updateAppointmentStatus(appointmentId: string, status: string): Observable<Appointment> {
    const url = `${this.apiUrl}/${appointmentId}/approve`;
    const body = { status: status };

    return this.http.put<Appointment>(url, body);
  }

  // rejectAppointment(appointmentId: string): Observable<any> {
  //   const url = `${this.apiUrl}/${appointmentId}/reject`;
  //   return this.http.put(url, {});
  // }
}
