import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/User';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }
}
