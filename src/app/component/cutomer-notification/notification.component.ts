// notification.component.ts
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notif-services/notification.service';
import { Notification } from '../../models/Notification';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-services/auth.service';

@Component({
  selector: 'app-notifications',
  imports: [
    CommonModule
  ],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  unreadCount: number = 0;
  currentUserId: string = ''; // Replace with actual user ID

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserId();
    // this.loadUnreadCount();
  }

  loadNotifications(): void {
    console.log('load notif userId', this.currentUserId)
    this.notificationService.getUserNotifications(this.currentUserId).subscribe({
      next: (notifications) => {
        this.notifications = notifications;
      },
      error: (err) => console.error('Failed to load notifications', err)
    });
  }

  loadUnreadCount(): void {
    this.notificationService.getUnreadCount(this.currentUserId).subscribe({
      next: (response) => {
        this.unreadCount = response.count;
      },
      error: (err) => console.error('Failed to get unread count', err)
    });
  }

  markAllAsRead(): void {
    this.notificationService.markAsRead(this.currentUserId).subscribe({
      next: () => {
        this.notifications.forEach(n => n.isRead = true);
        this.unreadCount = 0;
      },
      error: (err: any) => console.error('Failed to mark all as read', err)
    });
  }

  handleNotificationClick(notification: Notification): void {
    if (!notification.isRead) {
      this.notificationService.markAsRead(notification._id).subscribe({
        next: () => {
          notification.isRead = true;
          this.unreadCount = Math.max(0, this.unreadCount - 1);
        }
      });
    }
    
    // Handle navigation based on notification type
    if (notification.type === 'appointment' && notification.appointmentId) {
      // Navigate to appointment details
    }
    // Add other type-specific actions
  }

  deleteNotification(id: string, event: Event): void {
    event.stopPropagation(); // Prevent triggering the parent click
    this.notificationService.deleteNotification(id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n._id !== id);
        if (this.unreadCount > 0 && !this.notifications.find(n => n._id === id)?.isRead) {
          this.unreadCount--;
        }
      },
      error: (err) => console.error('Failed to delete notification', err)
    });
  }

  getIcon(type: string): string {
    switch(type) {
      case 'appointment': return 'far fa-calendar-check';
      case 'reminder': return 'far fa-clock';
      case 'system': return 'fas fa-info-circle';
      default: return 'far fa-bell';
    }
  }

  getIconClass(type: string): string {
    return type; // Matches the SCSS classes
  }

  formatDate(date: Date): string {
    return this.notificationService.formatNotificationDate(date);
  }

  getUserId(): void {
    const token =typeof window !== 'undefined' && window.localStorage? localStorage.getItem('token'): null;
		if (token) {
			this.authService.getUserData(token).subscribe({
				next: (response: any) => {
					this.currentUserId = response._id;
          this.loadNotifications();
				},
				error: (error: any) => {
					console.error('Error getting user id ', error);
				},
			});
		} else {
			console.warn('no token found in localstorage');
		}
  }

}