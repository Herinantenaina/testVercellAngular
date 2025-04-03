import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/customer-services/customer-appointment-services/appointment.service';
import { Appointment } from '../../models/appointment';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-services/auth.service';
import { CarService } from '../../services/car-services/car.service';
import { Car } from '../../models/Car';
import { ServicesService } from '../../services/create-services/services.service';
import { Service } from '../../models/Service';


@Component({
  selector: 'app-new-appointment-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-appointment-form.component.html',
  styleUrl: './new-appointment-form.component.scss'
})

export class NewAppointmentFormComponent implements OnInit{
  appointmentForm: FormGroup;
  minDate: string ='';
  user: any;
  cars: Car[] = [];
  selectedCarId: string = '';
  services: Service[] = [];
  selectedServiceId: string ='';
  newAppoOpen: boolean = false;
  selecteAppo: Appointment | null = null;
  maxDateTime: string ='';
  minDateTime: string ='';

  @Input() isEditMode: boolean = false;
  @Input() appoData: any = {};
  @Output() submit = new EventEmitter<Appointment>();
  @Output() Cancel = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private carService: CarService,
    private servicesService: ServicesService,
    private cdr: ChangeDetectorRef
  ) {
    this.appointmentForm = this.fb.group({
      serviceId: ['', Validators.required],
      appoDate: ['', Validators.required],
      appoNotes: ['', Validators.required],
      carId: ['', Validators.required],
    });

    this.setMinDate();
    }

  ngOnInit(): void {
    this.loadUserData();
    this.loadServices();
    if(this.isEditMode && this.appoData) {
      this.selecteAppo = this.appoData;
      console.log(this.selecteAppo);
    }
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const newAppointment: Appointment = {
        ...this.appointmentForm.value,
        customerId: this.user?._id,
        mechanicId: '65e4fa10a985851c54cd8500',
        appoPriceEstimate: 10,
        appoActualPrice: 100
      }

      if(this.isEditMode) {
        this.appointmentService.updateAppointment(this.appoData._id, newAppointment).subscribe({
          next: (response) => {
            this.submit.emit(response);
            this.resetForm();
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('Error updating appointment', error);
          }
        });
      }
      else {
        this.appointmentService.createAppointment(newAppointment).subscribe(
          response => {
            console.log('Appointment created successfully:', response);
            this.appointmentForm.reset();
            this.cdr.detectChanges();
          },
          error => {
            console.error('Error creating appointement', error);
          }
        );
      }
    }
  }

  setMinDate(){
    const today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(8, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setHours(17, 0, 0, 0);

    this.maxDateTime= maxDate.toISOString().slice(0, 16);
    this.minDateTime = today.toISOString().slice(0, 16);
    this.minDate = today.toISOString().slice(0, 16);
  }

  validateDateTime(event: any): void {
    const selectedDate = new Date(event.target.value);
    const hour = selectedDate.getHours();

    if (hour < 8 || hour > 17) {
      alert("Veuillez sélectionner une heure entre 08:00 et 17:00.");
      event.target.value = '';
    }
  }

  private resetForm(): void {
    if(!this.isEditMode) {
      this.appointmentForm.reset();
      this.selecteAppo = null;
      this.isEditMode = false;
      this.patchFormWithappoData();
    }
  }
  
  onCancel(): void {
    this.Cancel.emit();
    this.resetForm();
  }

  private loadUserData(): void {
    //code to get the user data
    const token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null;
    if (token) {
      this.authService.getUserData(token).subscribe({
        next: (response: any) => {
          this.user = response;
          this.loadCars();
          this.appointmentForm.patchValue({ customerId: this.user._id});
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

  loadCars(): void {
    if (!this.user) return;
    this.carService.getCarsByCustomer(this.user._id).subscribe(
      (data: Car[] ) => {
        this.cars = data;
      },
      (error) => {
        console.log('error fetching cars', error);
      }
    );
  }

  loadServices(): void {
    this.servicesService.getAllServices().subscribe(
      (data: Service[] ) => {
        this.services = data;
      }
    ),
    (error: any) => {
      console.error('fecthing services error', error)
    }
  }

  private patchFormWithappoData(): void {
    if(this.appoData) {
      this.appointmentForm.patchValue({
        _id: this.appoData._id,
        customerId: this.appoData.customerId,
        carId: this.appoData.carId,
        serviceId: this.appoData.serviceId,
        appoDate: this.appoData.appoDate
      });
      console.log('selected car data', this.appoData);
    } else {
      console.log('appoData not received in edit form')
    }
  }


}

