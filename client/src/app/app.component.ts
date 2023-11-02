import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hospital-app';
  userId: string | null = null;
  private userIdSubject: Subject<string | null> = new Subject<string | null>();
  role: string | any;
  private _isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userId = this.authService.getUserId();
      this.role = this.authService.getUserRole(); // Retrieve the user's role from the service
      console.log(this.role)
    }

    // this.authService.subscribeToUserIdChanges().subscribe(
    //   (userId: string | null) => {
    //     this.userId = userId;
    //     this.role = this.authService.getUserRole(); // Update the user's role when it changes

    //   },
    //   (error: any) => {
    //     console.error('Error fetching user ID:', error);
    //   }
    // );
  }

  isDoctorLoggedIn(): boolean {
    const role = this.authService.getRole();
    return role === 'doctor';
  }

  isPatientLoggedIn(): boolean {
    const role = this.authService.getRole();
    return role === 'patient';
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }



  // isLoggedIn(): boolean {
  //   return this.authService.isLoggedIn();
  // }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
