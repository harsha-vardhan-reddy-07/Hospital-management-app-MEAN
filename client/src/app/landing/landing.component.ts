import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this._isLoggedIn = true;
    }
  }

  ngOnInit(): void {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      const userId = this.authService.getUserId(); // Retrieve the userId from the service

      // Navigate to the restaurant component only if it's the initial navigation after login
      if (!this.route.snapshot.queryParams['userId']) {
        this.router.navigate(['/'], { queryParams: { userId } });
        return; // Return early to prevent executing the code below
      }
    }
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // isLoggedIn(): boolean {
  //   return this.authService.isLoggedIn();
  // }

  logoutUser(): void {
    this.authService.logout();
  }
}
