import { Component, ChangeDetectorRef } from '@angular/core';
import { SearchBarComponent } from "../../component/search-bar/search-bar.component";
import { NewAppointmentFormComponent } from "../new-appointment-form/new-appointment-form.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../models/appointment';
import { AppointmentService } from '../../services/customer-services/customer-appointment-services/appointment.service';
import { AuthService } from '../../services/auth-services/auth.service';
import { ServicesService } from '../../services/create-services/services.service';
import { CarService } from '../../services/car-services/car.service';
import { DeleteModalComponent } from "../../component/delete-modal/delete-modal.component";


@Component({
  selector: 'app-appointment',
  imports: [SearchBarComponent, NewAppointmentFormComponent, CommonModule, ReactiveFormsModule, DeleteModalComponent],
  templateUrl: './customer-appointment.component.html',
  styleUrl: './customer-appointment.component.scss'
})
export class CustomerAppointmentComponent {
  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private serviceService: ServicesService,
    private carservice: CarService,
    private changeDetect: ChangeDetectorRef
  ) {}

  selectedAppo: Appointment | null = null;
  isEditAppoForm: boolean = false;
  isNewAppoForm : boolean = false;
  user: any ;
  appointments: Appointment[] = [];
  filteredItems: Appointment[] = [];
  deleteModal: boolean = false;
  selectedAppointmentId: string | null = null;


  ngOnInit(): void {
    this.loadUserData();
  }

  showEditAppoForm(): void {
    this.isEditAppoForm = true;
  }

  hideEditAppoForm(): void {
    this.isEditAppoForm = false;
  }

  showNewAppoForm(): void {
    this.isNewAppoForm = true;
  }

  hideNewAppoForm(): void {
    this.isNewAppoForm = false;
  }

  onEditAppo(appo: Appointment): void {
    this.selectedAppo = {...appo};
    this.isEditAppoForm = true;
  }

  onAppoUpdated(updatedAppo: Appointment): void {
    this.selectedAppo = null;
    this.isEditAppoForm = false;
    this.changeDetect.detectChanges();
    this.loadAppointments();
  }

  onFormCancel() {
    this.isEditAppoForm = false;
    this.isNewAppoForm = false;
    this.selectedAppo = null;
  }

  private loadUserData(): void {
    const token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null;
    if (token) {
      this.authService.getUserData(token).subscribe({
        next: (response: any) => {
          this.user = response;
          if(this.user?._id) {
            this.loadAppointments();
          }
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

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (data: Appointment[]) => {
        this.appointments = data.filter(dt => dt.customerId == this.user._id);
  
        // Fetch service names for each appointment
        this.appointments.forEach(appointment => {
          this.serviceService.getById(appointment.serviceId).subscribe(
            (service) => {
              appointment.serviceId = service.serviceName; 
              
              // i fetch car license plate
              this.carservice.getCarById(appointment.carId).subscribe(
                (car) => {
                  appointment.carId = car.licensePlate;
                },
                (error) => {
                  console.log('Error fecthing car for ID in customer appointment view', error);
                }
              )
            },
            (error) => {
              console.log(`Error fetching service for ID ${appointment.serviceId}`, error);
            }
          );
        });
      },
      (error) => {
        console.log('Error fetching appointments', error);
      }
    );
  }

  deleteAppointment(id: string): void {
    if (id) {
      this.appointmentService.deleteAppointment(id).subscribe({
        next: () => {
          console.log('Appointment deleted successfully', id)
          this.changeDetect.detectChanges();
        },
        error: (err) => console.error('Error deleting appointment', err)
      });
      console.log('appo a effacer', id)
    }
    else console.log('id not received in delete appointment')
  }

  toggleDeleteModal():void {
    this.deleteModal = !this.deleteModal;
  }
  
  filterResults(searchText: string): void {
      this.filteredItems = this.appointments.filter(item => {
      item.appoNotes.toLowerCase().includes(searchText.toLowerCase())
    })

  }
}
