import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-services/auth.service';

@Component({
  selector: 'app-services',
  imports: [RouterOutlet,RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
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
