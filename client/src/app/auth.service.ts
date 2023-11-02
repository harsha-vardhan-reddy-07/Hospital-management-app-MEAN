import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, tap } from 'rxjs';
import { Doctor } from './appointment-booking/appointment-booking.component';
import { AppointmentService } from './appointment.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedInDoctor: Doctor | null = null;
  private userIdSubject: Subject<string | null> = new Subject<string | null>();
  authChange: EventEmitter<boolean> = new EventEmitter<boolean>(); // Add EventEmitter

  private token: string | null;
  private _isLoggedIn = false;
  private userId: string | null;
  private readonly USER_ROLE_KEY = 'userRole';


  constructor(private http: HttpClient,private appointmentService:AppointmentService) {
    this.token = localStorage.getItem('token');
    this._isLoggedIn = this.token !== null;
    this.userId = localStorage.getItem('userId');
   }

   getUserRole(): string | null {
    return localStorage.getItem(this.USER_ROLE_KEY);
  }

  setUserRole(role: string): void {
    localStorage.setItem(this.USER_ROLE_KEY, role);
  }

  clearUserRole(): void {
    localStorage.removeItem(this.USER_ROLE_KEY);
  }


  setUserId(userId: string): void {
    this.userId = userId;
    localStorage.setItem('userId', userId);
  }


  // Method to subscribe to userId changes
  subscribeToUserIdChanges(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }

  getUserId(): string | null {
    return this.userId;
  }

  isLoggedIn(): boolean {
    // Check if the user ID is set to determine the logged-in state
    return !!this.userId;
  }

  getToken(): string | null {
    return this.token;
  }


  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
    this._isLoggedIn = true;
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
    this._isLoggedIn = false;
  }

  register(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/authRoutes/register', user);
  }

  // login(credentials: any,doctor: Doctor): Observable<any> {
  //   this.loggedInDoctor = doctor;
  //   return this.http.post<any>('http://localhost:3000/authRoutes/login', credentials);
  // }

  login(credential: any, doctor: Doctor, role: string): Observable<any> {
    this.authChange.emit(true); // Emit event when user logs in
    this.loggedInDoctor = doctor;
    return this.http
      .post<{ token: string; userId: string }>('http://localhost:3000/authRoutes/login', credential)
      .pipe(
        tap((res) => {
          this.setToken(res.token);
          this.setUserId(res.userId);
          this.setUserRole(role); // Set the role in localStorage
          this.authChange.next(true);
        })
      );
  }


  // setLoggedIn(value: boolean): void {
  //   this.loggedInSubject.next(value);
  // }

  // isLoggedIn(): boolean {
  //   return !!this.loggedInSubject.value;
  // }



  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this._isLoggedIn = false;
    localStorage.removeItem('userId');
    this.userId = null;
    this.authChange.next(false);
    // Perform any necessary logout actions
    // this.setLoggedIn(false);
  }


  getRole(): string | null {
    return localStorage.getItem('role');
  }

}
