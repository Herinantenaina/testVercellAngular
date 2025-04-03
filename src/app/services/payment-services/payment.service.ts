import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Payment } from '../../models/Payment';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) { }

  createPayment(PaymentData: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, PaymentData);
  }

  getUserPayments(userId: string): Observable<Payment[]> {
    return this.http.get<{success: boolean, Payments: Payment[]}>(`${this.apiUrl}/${userId}`).pipe(
      map(response => {
        return response.Payments;
      }),
      catchError(error => {
        console.error('Error loading Payments:', error);
        return of([]); // Return empty array on error
      })
    );
  }

  getPaymentsByUser(userId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/${userId}`);
  }


  markAsRead(PaymentId: string): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${PaymentId}/read`, {});
  }

  deletePayment(PaymentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${PaymentId}`);
  }

  formatPaymentDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  getUnreadCount(userId: string): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/${userId}/unread-count`);
  }

  getPaymentsByType(userId: string, type: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/${userId}?type=${type}`);
  }
}