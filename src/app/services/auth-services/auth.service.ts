import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth'; 
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  isAuthenticated(): boolean {
    return this.isBrowser && !!localStorage.getItem('token');
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      this.currentUserSubject.next(null);
    }
  }

  getUserData(token: string | null) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/me`, { headers });
  }

  hasRole(role: string): boolean {
    return this.isBrowser && localStorage.getItem('role') === role;
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUserValue(): any {
    return this.currentUserSubject.value;
  }
}

