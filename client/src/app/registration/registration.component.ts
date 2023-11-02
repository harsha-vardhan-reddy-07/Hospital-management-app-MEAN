import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  {
  username: string |any;
  password: string |any;
  role: string |any;
  registerForm: FormGroup;
  specialization: string = '';
  contact: string = '';
  gender: string = '';
  age: string = '';

  constructor(private http: HttpClient,private authService: AuthService, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  register() {
    const user = {
      username: this.username,
      password: this.password,
      role: this.role,
      contact: this.contact,
      age: this.age,
      specialization: this.specialization,
      gender: this.gender
    };

    console.log(user);

    this.http.post('http://localhost:3000/authRoutes/register', user)
      .subscribe(
        (response:any) => {
          console.log(response);
          alert('Registration Successful!');
          this.router.navigate(['/login']);

        },
        error => {
          console.error(error);
          alert('Registration Failed!');
          // Handle error message
        }
      );
  }


}
