import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-services/auth.service';
import { AppointmentService } from '../../services/customer-services/customer-appointment-services/appointment.service';
import { MechanicService } from '../../services/add-mechanic/mechanic.service';
import { ServicesService } from '../../services/create-services/services.service';
import { LoadingComponent } from '../loading/loading.component';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-history-mecha',
  imports: [CommonModule, LoadingComponent],
  templateUrl: './history-mecha.component.html',
  styleUrl: './history-mecha.component.scss'
})
export class HistoryMechaComponent implements OnInit {
    constructor(
      private appointmentService: AppointmentService,
      private authService: AuthService,
      private userService: MechanicService,
      private serviceService: ServicesService
    ){}
  
    appointments: any[] = [];
    mechanicId: string = '';
    user : any;
    isLoading = true;

    ngOnInit(): void {
      this.initialize()
    }
  
    getAppoMecha(){
      this.isLoading = true
      return this.appointmentService.getAppointments().pipe(
        // Step 1: Filter appointments first
        map((data: any[]) => {
          return data.filter(app => 
            app.mechanicId.toString() === this.mechanicId
          );
        }),
        // Step 2: Process filtered appointments
        switchMap(filteredApps => {
          if (filteredApps.length === 0) {
            return of([]); // Early return if no appointments
          }
    
          // Step 3: Create parallel requests for each appointment
          const detailRequests = filteredApps.map(appointment => {
            return forkJoin([
              this.userService.getById(appointment.customerId),
              this.serviceService.getById(appointment.serviceId)
            ]).pipe(
              // Step 4: Transform the combined results
              map(([customer, service]) => ({
                ...appointment,
                customerName: `${customer.firstName} ${customer.lastName}`,
                serviceName: service.serviceName
              }))
            );
          });
    
          // Step 5: Execute all requests in parallel
          return forkJoin(detailRequests);
        })
      );
    }
  
    initialize(): void{
      const token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null;
      if (token) {
        this.authService.getUserData(token).subscribe({
          next: (response: any) => {
            this.mechanicId= response._id;
            this.isLoading = false;
          },
          error: (error: any) => {
            console.error('Error fetching user data', error);
            this.isLoading = false;
          }
        })
      }
      else {
        this.isLoading = false
        console.warn('no token found in localstorage');
      }
      
      this.getAppoMecha()
      this.isLoading = false
    }
  
  
  
    formatDate(isoString: string): string {
      const date = new Date(isoString);
      
      const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
    
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedTime = `${hours}h${minutes.toString().padStart(2, '0')}`;
    
      return `${formattedDate}, ${formattedTime}`;
    }
}
