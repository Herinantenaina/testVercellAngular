import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../../services/signUpServices/sign-up.service';
import { User } from '../../models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-form',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {
  signUpForm : FormGroup;
  constructor(
    private fb: FormBuilder,
    private signupService: SignUpService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const newUser: User = this.signUpForm.value;
      this.signupService.createUser(newUser).subscribe(
        response => {
          console.log('User created successfully:', response);
          this.signUpForm.reset();
          this.router.navigate(['/customer']);
        },
        error => {
          console.error('Error creating appointement', error);
        }
      );
    }
  }

  @Output() crossClicked = new EventEmitter<void>();

  onCrossClick() {
    this.router.navigate(['/'])
    this.crossClicked.emit();
  }





}
