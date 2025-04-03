import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Appointment } from '../../../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = environment.apiUrl + '/appointments';
  constructor(private http: HttpClient) { }
  
  getAppointments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAppointment(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getMechanicAppointments(mechanicId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/mechanic/${mechanicId}`);
  }

  getStat(): Observable<any>{
    return this.http.get(`${this.apiUrl}/stats`);
  }

  createAppointment(appointments: Appointment): Observable<any> {
    return this.http.post(this.apiUrl, appointments);
  }

  updateAppointment(id: string, appointments: Appointment): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, appointments);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
