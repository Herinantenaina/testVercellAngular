import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/User';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-services/auth.service';
import { UserService } from '../../services/user-services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  errorType: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  

  onSubmit(): void {

    if(this.loginForm.valid) {
      const loginData: User = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (response: any) => {

          console.log('Login successful', response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);

            if(response.role === 'customer' ) {
              this.router.navigate(['/customer']);
            } else if (response.role === 'admin') {
              this.router.navigate(['/admin']);
            } else if (response.role === 'mechanic'){
              this.router.navigate(['/mechanic']);
            } else {
              this.router.navigate(['/login']);
              console.log('this is an unknown profile')
            }

            this.authService.getUserData(response.token).subscribe({
              next: (userData: any) => {
                this.userService.setUser(userData);
              },
              error: (error: any) => {
                console.error('fetching data error', error)
              }
            })
      

        },
        error: (error: any) => {
          console.error('Login failed', error);
          //checking if the error to display it on the login screebn
          if (error.status === 401) {
            this.errorMessage = 'Incorrect password!';
            this.errorType = 'password';
          } else if (error.status === 404) {
            this.errorMessage = 'Account not registered!';
            this.errorType = 'email';
          } else {
            this.errorMessage = 'An unexpected error occurred!';
          }
        }
      });
    }

  }

  onSignup(){
    this.router.navigate(['/signUp'])
  }
  @Output() crossClicked = new EventEmitter<void>();
  onCrossClick(){
    this.router.navigate(['/'])
    this.crossClicked.emit();
  }

}
