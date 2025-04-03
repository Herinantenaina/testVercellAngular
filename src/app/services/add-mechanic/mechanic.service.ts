import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class MechanicService {

  apiUrl = `${environment.apiUrl}/users`  
  constructor(private http: HttpClient) {}

  addMechanic(mechanic: User): Observable<any>{
    return this.http.post(this.apiUrl, mechanic)
  }

  getById(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  getAllMechanics(): Observable<any>{
    return this.http.get(this.apiUrl)
  }

  updateMechanic(mechanic: User, id: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, mechanic)
  }

  deleteMechanic(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
