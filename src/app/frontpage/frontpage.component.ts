import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { Section1Component } from "./section1/section1.component";
import { Section2Component } from "./section2/section2.component";
import { Section3Component } from './section3/section3.component';
import { FooterCustomerComponent } from "../component/footer-customer/footer-customer.component";
import { LoginComponent } from "../component/login/login.component";

@Component({
  selector: 'app-frontpage',
  imports: [
    HeaderComponent,
    Section1Component,
    Section2Component,
    Section3Component,
    FooterCustomerComponent,
    CommonModule,
    LoginComponent
],
  templateUrl: './frontpage.component.html',
  styleUrl: './frontpage.component.scss'
})
export class FrontpageComponent {
  showSignUpForm: boolean = false;  

  toggleSignUpForm() {
    this.showSignUpForm = !this.showSignUpForm;
  }
}
