import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from './Prescription';
import { Patient } from './Patient';
import { Doctor } from './Doctor';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    const url = `${this.apiUrl}/patients`; // Replace 'patients' with your patients endpoint
    return this.http.get<Patient[]>(url);
  }

  getDoctors(): Observable<Doctor[]> {
    const url = `${this.apiUrl}/doctors`; // Replace 'doctors' with your doctors endpoint
    return this.http.get<Doctor[]>(url);
  }

  createPrescription(prescriptionData: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(`${this.apiUrl}/prescriptions`, prescriptionData);
  }

  getPrescriptionsByPatientName(patientName: string): Observable<any> {
    const url = `${this.apiUrl}/prescriptions/patient/name/${patientName}`;
    return this.http.get(url);
  }
}
