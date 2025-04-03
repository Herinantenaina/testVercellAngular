import { Component } from '@angular/core';
import { NavbarAdmin } from "../../component/navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-header',
  imports: [NavbarAdmin],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
