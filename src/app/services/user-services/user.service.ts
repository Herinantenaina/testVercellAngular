
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;

  constructor(private http: HttpClient) {}

  fetchUserData(): Observable<any> {
    return this.http.get('/auth/me');
  }

  setUser(user: any): void {
    this.user = user;
  }

  getUser(): any {
    return this.user;
  }
}
