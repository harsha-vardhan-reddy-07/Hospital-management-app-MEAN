import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Role, User } from '../User';
import { Router } from '@angular/router';
import { Doctor } from '../appointment-booking/appointment-booking.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string |any;
  password: string |any;
  role: string |any;
  userId!:string;
  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    const user: User = this.loginForm.value;
    const doctor: Doctor = this.loginForm.value;

    this.authService.login(user, doctor, this.loginForm.value.role).subscribe(
      (response) => {
        console.log(response);
        // Assuming authService.login() returns an Observable with the response
        // set token received from server
        this.authService.setToken(response.token);
        localStorage.setItem('role', this.loginForm.value.role); // store usertype in localStorage
        localStorage.setItem('password', this.loginForm.value.password); // store usertype in localStorage
        localStorage.setItem('username', this.loginForm.value.username); // store usertype in localStorage

        // Extract the user data from the response
        const loggedInUser: User = response.user;
        this.userId = response.user._id; // Set the userId from the response
        console.log('UserID:', this.userId);

        this._isLoggedIn = true; // modify the private backing field

        this.authService.setUserId(this.userId);
        // Print the user data in the console
        console.log('Logged-in User:', loggedInUser);

        // Store the user data in the local storage or any other appropriate place
        // For example, you can store it in local storage
        localStorage.setItem('user', JSON.stringify(loggedInUser));

        console.log(loggedInUser.role);

        // Redirect based on user role
        switch (loggedInUser.role.name) {
          case "doctor":
            this.router.navigate(['//doctordashboard']);
            break;
          case "patient":
            this.router.navigate(['//patientdashboard']);
            break;
          default:
            this.router.navigate(['/']);
            break;
        }
      },
      (error) => {
        // Handle the login error here
        console.log('Login failed', error);
      }
    );
  }

}
