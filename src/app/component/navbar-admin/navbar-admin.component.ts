import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user-services/user.service';

@Component({
  selector: 'app-navbar-admin',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.scss'
})
export class NavbarAdmin implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ){}

  isDropdownVisible: boolean = false;
  isMenuVisible: boolean = false; 
  user: any;

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

  ngOnInit() {
    
    const token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null;
    if (token && this.authService) {
      this.authService.getUserData(token).subscribe({
        next: (response: any) => {
          this.user = response;
        },
        error: (error: any) => {
          console.error('Error fetching user data', error);
          this.router.navigate(['/login']);
        }
      })
    }
    else {
      console.warn('no token found in localstorage');
    }
  }
}
