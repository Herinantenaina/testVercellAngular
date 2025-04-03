import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services/create-services/services.service';
import { Service } from '../../models/Service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-services-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './services-add.component.html',
  styleUrl: './services-add.component.scss'
})

export class ServicesAddComponent {

  userForm!: FormGroup;
  newService: any = {
    serviceName: '',
    serviceType: '',
    serviceDescription: '',
    serviceEstimatedPrice: 0,
    serviceEstimatedDuration: new Date()
  };
  constructor(private fb: FormBuilder, private servicesService: ServicesService, private cdr: ChangeDetectorRef){};

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['00:00', [Validators.required]],
      durationHours: [, [Validators.required, Validators.min(0), Validators.max(23)]],
      durationMinutes: [, [Validators.required, Validators.min(0), Validators.max(59)]],
    })
  }

  onSubmit(): void{
    if (this.userForm.valid){
      //Add the new service to the db
      const hours = this.userForm.get('durationHours')?.value
      const minutes = this.userForm.get('durationMinutes')?.value
      
      const estimatedDuration = new Date()
      estimatedDuration.setUTCHours(hours,minutes,0,0);
      console.log(estimatedDuration)
      this.newService.serviceEstimatedDuration = estimatedDuration; 
      this.servicesService.createService(this.newService).subscribe({
        next: () => {
          
          this.userForm.reset();
          this.showNotification();
          this.cdr.detectChanges();
          console.log('Saved');
        },
        error: (err) =>console.error('Error while sending the data', err)
      })
      
    }
  }

  onReset(): void{
    this.userForm.reset()
  }

  showNotification() {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        this.displayNotification();
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            this.displayNotification();
          }
        });
      }
    } else {
      alert('Your browser does not support notifications.');
    }
  }

  private displayNotification() {
    new Notification('Success', {
      body: 'Customer added successfully!',
    });
  }
  
}
