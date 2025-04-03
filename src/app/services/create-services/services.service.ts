import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../models/Service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = `${environment.apiUrl}/services`;
  constructor(private http: HttpClient) { }

  getById(id:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  getAllServices(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createService(service: Service): Observable<any> {
    return this.http.post(this.apiUrl, service);
  }
  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateService(id: string, service: Service): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, service);
  }
}
