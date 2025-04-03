import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../models/appointment';
import { AppointmentService } from '../../services/customer-services/customer-appointment-services/appointment.service';
import { MechanicService } from '../../services/add-mechanic/mechanic.service';
import { ServicesService } from '../../services/create-services/services.service';

@Component({
  selector: 'app-appointment-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent implements OnInit{

  constructor(
    private appointmentService: AppointmentService, 
    private cdr:ChangeDetectorRef,
    private userService: MechanicService,
    private serviceService: ServicesService
  ){}

  isEditModalOpen = false;
  isDeleteModalOpen = false;
  selectedAppointment: any = null;
  appointments: any[] = [];
  id!: string;
  mechanics: any[] = [];

  ngOnInit(): void {
    this.loadAppointments();
  }

  openEditModal(appointment: Appointment) {
    this.selectedAppointment = { ...appointment }; // Create a copy of the appointment object
    this.isEditModalOpen = true;
    this.id = this.selectedAppointment.id || this.selectedAppointment._id;
    if (this.selectedAppointment.customerId) {
      this.getInfoModal(this.selectedAppointment.customerId, this.selectedAppointment.mechanicId, this.selectedAppointment.serviceId);
    }
  }

  
  closeEditModal() {
    this.isEditModalOpen = false;
    this.cdr.detectChanges();
  }

  onSubmit() {
        // Send the updated data to your backend/database here       
        this.cdr.detectChanges()
        this.closeEditModal();
      }
  

  openDeleteModal(appointment: Appointment) {
    this.selectedAppointment = { ...appointment }
    this.isDeleteModalOpen = true
  }

  closeDeleteModal(){
    this.isDeleteModalOpen = false
    this.selectedAppointment = null
  }

  delete(){
    console.log('deleted')
    this.isDeleteModalOpen = false
  }

  loadAppointments(){
    const currentDate = new Date()
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data;
      this.appointments = this.appointments.filter(appointment => new Date(appointment.appoDate) >= currentDate)

      for(let appointment of this.appointments){
        this.userService.getById(appointment.customerId).subscribe(customer =>{
          appointment.customerName = customer.firstName + ' ' + customer.lastName
        });
        
        this.userService.getById(appointment.mechanicId).subscribe(mechanic =>{
          appointment.mechanicName = mechanic.firstName + ' ' + mechanic.lastName
        });

        this.serviceService.getById(appointment.serviceId).subscribe(service =>{
          appointment.serviceName = service.serviceName 
        })

      };
    })   
  }

  getInfoModal(customerId: string, mechanicId: string, serviceId: string) {
    this.userService.getById(customerId).subscribe(customer => {
      this.selectedAppointment.customerName = customer.firstName + ' ' + customer.lastName;
    });

    this.userService.getById(mechanicId).subscribe(mechanic =>{
      this.selectedAppointment.mechanicName = mechanic.firstName + ' ' + mechanic.lastName;
    });

    this.serviceService.getById(serviceId).subscribe(service =>{
      this.selectedAppointment.service = service.serviceName
      console.log(service)
    });
    this.cdr.detectChanges();
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

  checkSameAppoDate(appointments: any[], mechanics: any[]) {
    for (let i = 0; i < appointments.length; i++) {
      for (let j = i + 1; j < appointments.length; j++) {
        const date1 = new Date(appointments[i].appoDate);
        const date2 = new Date(appointments[j].appoDate);
        const isSameTime = 
          date1.getMonth() == date2.getMonth() &&
          date1.getDate()  == date2.getDate() &&
          date1.getHours() == date2.getHours() &&
          date1.getMinutes() == date2.getMinutes()

        if (isSameTime) {
          console.log('Duplicate found between appointments', i, 'and', j);

          return true; // Exit early if you just need to know duplicates exist
        }
        
      }
    }
    console.log('No duplicates found');
    let test = new Date(appointments[1].appoDate)
    console.log(test)
    
    return false;
  }

  checkMechanicAvailability(mechanic: any[]){
    for(let i = 0; i < mechanic.length; i++){
      
    }
  }
  
  
}
