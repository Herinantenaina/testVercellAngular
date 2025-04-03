import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Car } from '../../models/Car';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = `${environment.apiUrl}/cars`;
  constructor(private http: HttpClient) { }

  getCarById(id:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  getCars(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createCar(car: Car): Observable<any> {
    return this.http.post(this.apiUrl, car);
  }
  deleteCar(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateCar(id: string, car: Car): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, car);
  }
  getCarsByCustomer(cusId: string | null): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/byCustomer/${cusId}`);
  }
}
