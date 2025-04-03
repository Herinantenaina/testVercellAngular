import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Notification } from '../../models/Notification';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) { }

  createNotification(notificationData: Omit<Notification, 'id' | 'isRead' | 'createdAt'>): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, notificationData);
  }

  getUserNotifications(userId: string): Observable<Notification[]> {
    return this.http.get<{success: boolean, notifications: Notification[]}>(`${this.apiUrl}/${userId}`).pipe(
      map(response => {
        return response.notifications;
      }),
      catchError(error => {
        console.error('Error loading notifications:', error);
        return of([]); // Return empty array on error
      })
    );
  }

  markAsRead(notificationId: string): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}/${notificationId}/read`, {});
  }

  deleteNotification(notificationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${notificationId}`);
  }

  formatNotificationDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  getUnreadCount(userId: string): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/${userId}/unread-count`);
  }

  getNotificationsByType(userId: string, type: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/${userId}?type=${type}`);
  }
}