import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-services/user.service';
import { NotificationService } from '../../services/notif-services/notification.service';

@Component({
  selector: 'app-navbar-customer',
  imports: [CommonModule],
  templateUrl: './navbar-customer.component.html',
  styleUrl: './navbar-customer.component.scss'
})
export class NavbarCustomerComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ){}

  isDropdownVisible: boolean = false;
  isMenuVisible: boolean = false;
  user: any;
  unreadCount: number = 0;


  
  ngOnInit() {
    this.loadUserData();
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  toggleMenu() {
    const menu :HTMLElement | null = document.querySelector('#customer-navbar');
    const screenWidth = window.innerWidth;
    if (screenWidth <= 1000) {
      if (menu && !this.isMenuVisible ) {
        menu.style.transform = 'translateX(0%)';
        this.isMenuVisible = true;
      }
  
      else if ( menu && this.isMenuVisible) {
        menu.style.transform = 'translateX(-95%)';
        this.isMenuVisible = false;
      }
    }
   
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  private loadUserData() {
    const token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null;
    if (token) {
      this.authService.getUserData(token).subscribe({
        next: (response: any) => {
          this.user = response;
          this.loadUnreadCount();
        },
        error: (error: any) => {
          console.error('Error fetching user data', error);
        }
      })
    }
    else {
      console.warn('no token found in localstorage');
    }
  }

  loadUnreadCount(): void {
    const userId = this.user._id;
    this.notificationService.getUnreadCount(userId).subscribe({
      next: (response) => {
        this.unreadCount = response.count;
      },
      error: (err) => {
        console.error('failed to load unread count', err)
      }
    })
  }
}
