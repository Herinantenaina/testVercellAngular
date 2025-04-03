import { Component } from '@angular/core';
import { RouterOutlet,RouterLinkActive, RouterLink } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from '../services/auth-services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [ HeaderComponent, RouterOutlet ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  activeComponent: string = 'dashboard';
  
  constructor(private authService: AuthService){}

  showComponent(componentName: string){
    this.activeComponent = componentName;
  }

  chartData = [
    { label: 'Q1', value: 45 },
    { label: 'Q2', value: 68 },
    { label: 'Q3', value: 72 },
    { label: 'Q4', value: 55 }
  ];
}
