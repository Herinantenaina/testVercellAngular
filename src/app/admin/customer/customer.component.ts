import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterLinkActive, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-services/auth.service';

@Component({
  selector: 'app-customer',
  imports: [ CommonModule,RouterOutlet,RouterLink,RouterLinkActive ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
    user: any;
    constructor(private authService: AuthService){}
  
   ngOnInit(): void {
     this.initialize();
   }
  
   initialize(): void{
    const token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null;
      if (token) {
        this.authService.getUserData(token).subscribe({
          next: (response: any) => {
            this.user = response;
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
}
