import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-services/auth.service';
import { AppointmentService } from '../../services/customer-services/customer-appointment-services/appointment.service';
import { MechanicService } from '../../services/add-mechanic/mechanic.service';
import { ServicesService } from '../../services/create-services/services.service';
import { Notification } from '../../models/Notification';
import { NotificationService } from '../../services/notif-services/notification.service';
import { PaymentService } from '../../services/payment-services/payment.service';


@Component({
  selector: 'app-appo-mecha',
  imports: [CommonModule],
  templateUrl: './appo-mecha.component.html',
  styleUrl: './appo-mecha.component.scss'
})
export class AppoMechaComponent implements OnInit {
  
  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private userService: MechanicService,
    private serviceService: ServicesService,
    private notifService: NotificationService,
    private paymentService: PaymentService

  ){}
  
  appointments: any[] = [];
  mechanicId: string = '';
  user : any;
  customerId: any;

  ngOnInit(): void {
    if (!this.mechanicId){
      setTimeout(() => this.initialize(), 500);
    }else {
      this.initialize()
    }
  }

  getAppoMecha():void{
    this.appointmentService.getAppointments().subscribe(data =>{
      const currentDate = new Date();
      this.appointments = data;
      this.appointments = this.appointments.filter(appointment => appointment.mechanicId.toString() == this.mechanicId)
      this.appointments = this.appointments.filter(appointment => new Date(appointment.appoDate) >= currentDate)
      console.log(this.appointments);
      for(let appointment of this.appointments){
        this.userService.getById(appointment.customerId).subscribe(customer =>{
          appointment.customerName = customer.firstName + ' ' + customer.lastName
        });
        
        this.serviceService.getById(appointment.serviceId).subscribe(service =>{
          appointment.serviceName = service.serviceName 

        })
      }
    })
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
        }
      })
    }
    else {
      console.warn('no token found in localstorage');
    }
    
    this.getAppoMecha()

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

  appoToDone(appoId: string): void {
    const appointment: any = { appoStatus: 'done' };
    this.appointmentService.updateAppointment(appoId, appointment).subscribe({
      next: (response: any) => { 
        console.log('appointment updated') 
        this.customerId = response.customerId;
        this.sendCustomerNotif(appoId);
        this.createPayment(appoId);

      },
      error: (err) => console.error('Error updating appointment', err)
    });

  }

  sendCustomerNotif(appoId: string) {
    const today = new Date();
    const newNotif: Notification = {
      _id:'',
      isRead: false,
      userId: this.customerId,
      title: 'Car is ready',
      message: 'Your car is ready to be picked up.',
      type: 'appointment',
      appointmentId: appoId,
      createdAt: today
    };

    this.notifService.createNotification(newNotif).subscribe({
      next: response => {
        console.log('Notification created successfully');
      },
      error: err => {
        console.error('Error creating notification:', err);
      }
    })
  }


  createPayment(appoId: string): void {
    this.appointmentService.getAppointment(appoId).subscribe((appointment: any) => {
      console.log(appointment);
      const newPayment = {
        appointmentId: appoId,
        paymentStatus: 'unpaid',
        paymentMethod: 'cash',
        customerId: this.customerId,
        amount: appointment.appoPriceEstimate,
      };
      this.paymentService.createPayment(newPayment).subscribe({
        next: (response: any) => { 
          console.log('payment created') 
        },
        error: (err: any) => console.error('Error creating payment', err)
      });
    });
  }

}
