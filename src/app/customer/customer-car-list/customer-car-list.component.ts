import { Component } from '@angular/core';
import { NewCarFormComponent } from "./new-car-form/new-car-form.component";
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car-services/car.service';
import { Car } from '../../models/Car';
import {AuthService} from '../../services/auth-services/auth.service';
import { DeleteModalComponent } from '../../component/delete-modal/delete-modal.component';

@Component({
	selector: 'app-customer-car-list',
	imports: [NewCarFormComponent, CommonModule, DeleteModalComponent],
	templateUrl: './customer-car-list.component.html',
	styleUrl: './customer-car-list.component.scss',
})
export class CustomerCarListComponent {
	isAddCarForm: boolean = false;
  	isEditCarForm: boolean = false;
	cars: Car[] = [];
	user: any;
	selectedCar: Car | null = null;

	constructor(
		private carService: CarService,
		private authService: AuthService
	) {}

	showEditCarForm(): void {
		this.isEditCarForm = true;
	}

  	hideEditCarForm(): void {
		this.isEditCarForm = false;
	}

  	showAddCarForm(): void {
    	this.isAddCarForm = true;
  	}

 	hideAddCarForm(): void {
    	this.isAddCarForm = false;
  	}

	ngOnInit(): void {
		this.loadUserData();
	}

	loadCars(): void {
		if (!this.user) return;
		console.log('user id', this.user._id);
		this.carService.getCarsByCustomer(this.user._id).subscribe(
			(data: Car[]) => {
				this.cars = data;
				console.log('customer cars', this.cars);
			},
			(error) => {
				console.log('error fetching cars', error);
			}
		);
	}

	deleteCar(id: string) {
		if (id) {
			this.carService.deleteCar(id).subscribe({
				next: () => console.log('Car successfully deleted'),
				error: (er) => console.error('Error deleting car', er),
			});
		}
	}

  onEditCar(car: Car): void {
    this.selectedCar = {...car};
    this.isEditCarForm = true;
  }

  onCarUpdated(updatedCar: Car): void {
    this.selectedCar = null;
    this.isEditCarForm = false;
    this.loadCars();
  }

  onFormCancel() {
    this.isEditCarForm = false;
    this.isAddCarForm = false
    this.selectedCar = null;
  }

  private loadUserData(): void {
	const token =typeof window !== 'undefined' && window.localStorage? localStorage.getItem('token'): null;
		if (token) {
			this.authService.getUserData(token).subscribe({
				next: (response: any) => {
					this.user = response;
					if (this.user?._id) {
						this.loadCars();
					}
					console.log('car-list', response);
				},
				error: (error: any) => {
					console.error('Error fetching user data', error);
				},
			});
		} else {
			console.warn('no token found in localstorage');
		}
  }
}
