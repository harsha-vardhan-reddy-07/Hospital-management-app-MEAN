import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../prescription.service';
import { Patient } from '../Patient';
import { Doctor } from '../Doctor';




export interface Prescription {
  id: number;
  patient: string; // Assuming it represents the patient's name or ID
  doctor: string; // Assuming it represents the doctor's name or ID
  medication: string;
  dosage: string;
  createdAt: Date;
}


@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css']
})
export class PrescriptionFormComponent implements OnInit {
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  selectedPatient: string;
  selectedDoctor: string;
  medication: string;
  dosage: string;

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit() {
    this.getPatients();
    this.getDoctors();
  }

  getPatients() {
    this.prescriptionService.getPatients()
      .subscribe(
        patients => {
          this.patients = patients;
        },
        error => {
          console.error('Failed to fetch patients:', error);
        }
      );
  }

  getDoctors() {
    this.prescriptionService.getDoctors()
      .subscribe(
        doctors => {
          this.doctors = doctors;
        },
        error => {
          console.error('Failed to fetch doctors:', error);
        }
      );
  }

  createPrescription(): void {
    const prescriptionData = {
      patient: this.selectedPatient,
      doctor: this.selectedDoctor,
      medication: this.medication,
      dosage: this.dosage
    };

    this.prescriptionService.createPrescription(prescriptionData)
      .subscribe(
        prescription => {
          // Handle successful creation of prescription
          alert('Prescription created');
          console.log('Prescription created:', prescription);
            // Reset form fields
        this.selectedPatient = '';
        this.selectedDoctor = '';
        this.medication = '';
        this.dosage = '';
        },
        error => {
          // Handle error
          console.error('Failed to create prescription:', error);
        }
      );
  }
}
