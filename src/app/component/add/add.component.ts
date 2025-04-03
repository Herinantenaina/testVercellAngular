import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MechanicService } from '../../services/add-mechanic/mechanic.service';
import { User } from '../../models/User';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  userForm!: FormGroup;
  newUser: User ={
    firstName: '',
    lastName: '',
    email: '',
    phone: 0,
    role:'customer',
    password: '',
    createdAt: new Date ,
    updatedAt: new Date,
  }
  constructor(private fb: FormBuilder, private userService: MechanicService, private cdr: ChangeDetectorRef){};

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
      this.newUser.role = 'customer';
      const formattedPhone = Number(this.userForm.value.phoneNumber.replace(/\s/g, ''));
      this.newUser.createdAt = new Date();
      this.newUser.updatedAt = new Date();
      this.newUser.phone = formattedPhone;
      this.userService.addMechanic(this.newUser).subscribe({
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