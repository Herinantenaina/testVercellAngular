import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CalendarComponent } from '../../component/calendar/calendar.component'; 
import { CommonModule } from '@angular/common';
import { LastUserComponent } from '../../component/last-user/last-user.component';
import { TopEmployeeComponent } from '../../component/top-employee/top-employee.component';
import { MechanicService } from '../../services/add-mechanic/mechanic.service';
import { AppointmentService } from '../../services/customer-services/customer-appointment-services/appointment.service';
import { ServicesService } from '../../services/create-services/services.service';
import { AuthService } from '../../services/auth-services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports:[ RouterLink, RouterLinkActive, CalendarComponent,CommonModule, LastUserComponent, TopEmployeeComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit{
  
  constructor(
    private authService: AuthService,
    private serviceService: ServicesService,
    private userService: MechanicService,
    private appointmentService: AppointmentService
  ){}

  isExpanded = false
  currentDate: string = '';
  services: any[] = [];
  mechanics: any[] = [];
  customers: any[] = [];
  appoitments: any[] = [];
  user: any;
  
  getCount(){
    this.serviceService.getAllServices().subscribe(data => this.services = data)

    this.appointmentService.getAppointments().subscribe(data => this.appoitments = data)

    this.userService.getAllMechanics().subscribe(data => {
      this.customers = data,
      this.customers = this.customers.filter(data => data.role == 'customer')
    })
  
    this.userService.getAllMechanics().subscribe(data => {
      this.mechanics = data,
      this.mechanics = this.mechanics.filter(data => data.role == 'mechanic')
    })  
  }

  ngOnInit(): void {
    this.initialize()
    this.getCount()
  }

  initialize(): void{
    const today = new Date();
    
    this.currentDate = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

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
