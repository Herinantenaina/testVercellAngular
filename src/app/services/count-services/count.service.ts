import { Injectable } from '@angular/core';
import { Count } from '../../models/count';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/count`;

  getByID(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  get(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  put(id: string, count: Count): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, count);
  } 

  delete(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
