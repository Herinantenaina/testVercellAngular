import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../../../services/car-services/car.service';
import { Car } from '../../../models/Car';
import {AuthService} from '../../../services/auth-services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-car-form',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-car-form.component.html',
  styleUrl: './new-car-form.component.scss'
})
export class NewCarFormComponent implements OnInit{
  carForm: FormGroup;
  user: any;
  selectedCar: any;

  @Input() isEditMode: boolean = false;
  @Input() carData: any = {};
  @Output() submit = new EventEmitter<Car>();
  @Output() Cancel = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private authService: AuthService
  ) {
    this.carForm = this.fb.group({
      customerId: '', // Set initially as empty
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      licensePlate: ['', Validators.required],
      vin: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    if (this.isEditMode && this.carData) {
      this.selectedCar = this.carData;
      this.patchFormWithCarData();
    }
  }

  
  onSubmit() {
    if(this.carForm.valid) {
      const newCar: Car = this.carForm.value;

      //if it's an edit 
      if ( this.isEditMode) {
        this.carService.updateCar(this.carData._id ,newCar).subscribe({
          next: (response) => {
            this.submit.emit(response);
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating car', error)
          }
        });
      } else {
        this.carService.createCar(newCar).subscribe(
          response => {
            console.log('Car added succesfully:', response);
            this.carForm.reset();
          },
          error => {
            console.error('Error adding car', error);
            console.log(newCar);
          }
        )
      }
      
    } else {
      this.markFormGroupTouched(this.carForm)
    }
  }

  private loadUserData(): void {
    //code to get the user data
    const token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null;
    if (token) {
      this.authService.getUserData(token).subscribe({
        next: (response: any) => {
          this.user = response;
          this.carForm.patchValue({ customerId: this.user._id});
          this.carForm = this.fb.group({
            customerId: this.user._id,
            brand: ['',Validators.required],
            model: ['',Validators.required],
            year: ['',Validators.required],
            licensePlate: ['',Validators.required],
            vin: ['',Validators.required],
          })
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


  private patchFormWithCarData(): void {
    if(this.carData) {
      this.carForm.patchValue({
        _id: this.carData._id,
        cutomerId: this.carData.customerId,
        brand: this.carData.brand,
        model: this.carData.model,
        year: this.carData.year,
        licensePlate: this.carData.licensePlate,
        vin:this.carData.vin
      });
      console.log('selected car data', this.carData);
    } else {
      console.log('carData not received in edit form')
    }
  }

  onCancel(): void {
    this.Cancel.emit();
    this.resetForm()
  }

  private resetForm(): void {
    if(!this.isEditMode) {
      this.carForm.reset();
      this.carForm.patchValue({ customerId: this.user?._id || ''});
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if(control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    })
  }

}
