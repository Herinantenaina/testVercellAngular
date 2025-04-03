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
      if (!this.mechanicId){
        setTimeout(() => this.initialize(), 5000);
      }else {
        this.initialize()
      }
    }
  
    getAppoMecha(){
      console.time('Start')
      this.appointmentService.getAppointments().subscribe(data =>{
        const currentDate = new Date();
        this.appointments = data;
       /*  this.appointments = this.appointments.filter(appointment => appointment.mechanicId.toString() == this.mechanicId)
        this.appointments = this.appointments.filter(appointment => new Date(appointment.appoDate) >= currentDate)
        console.log(this.appointments);
        for(let appointment of this.appointments){
          this.userService.getById(appointment.customerId).subscribe(customer =>{
            appointment.customerName = customer.firstName + ' ' + customer.lastName
          });
          
          this.serviceService.getById(appointment.serviceId).subscribe(service =>{
            appointment.serviceName = service.serviceName 
  
          })
        } */
      })
      console.timeEnd('End')
    }
  
    initialize(): void{
      const token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null;
      if (token) {
        this.authService.getUserData(token).subscribe({
          next: (response: any) => {
            this.mechanicId= response._id;
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
