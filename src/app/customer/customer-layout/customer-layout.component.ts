import { Component } from '@angular/core';
import { NavbarCustomerComponent } from "../../component/navbar-customer/navbar-customer.component";
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-customer-layout',
  imports: [NavbarCustomerComponent, RouterModule],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.scss'
})
export class CustomerLayoutComponent {

}
