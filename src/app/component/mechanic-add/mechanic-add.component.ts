import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MechanicService } from '../../services/add-mechanic/mechanic.service';
import { User } from '../../models/User';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mechanic-add',
  imports: [ CommonModule,ReactiveFormsModule ],
  templateUrl: './mechanic-add.component.html',
  styleUrl: './mechanic-add.component.scss'
})
export class MechanicAddComponent {
  userForm!: FormGroup;
  newMechanic: User ={
    firstName: '',
    lastName: '',
    email: '',
    phone: 0,
    role:'mechanic',
    password: '',
    createdAt: new Date ,
    updatedAt: new Date,
  }

  constructor(private fb: FormBuilder, private mechanicService: MechanicService, private cdr: ChangeDetectorRef){};

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phoneNumber: ['', Validators.pattern(/^\d{3} \d{2} \d{3} \d{2}$/)],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void{
    if (this.userForm.valid){
      //add the new mechanic in the db
      const formattedPhone = Number(this.userForm.value.phoneNumber.replace(/\s/g, ''));
      this.newMechanic.role = 'mechanic';
      this.newMechanic.createdAt = new Date();
      this.newMechanic.updatedAt = new Date();
      this.newMechanic.phone = formattedPhone;
      this.mechanicService.addMechanic(this.newMechanic).subscribe({
        next:() =>{
          console.log('Saved');
          this.userForm.reset();
          this.cdr.detectChanges()
          this.showNotification();
          this.cdr.detectChanges()
        },
        error: err => console.error('Error here:', err)
      });

      
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
