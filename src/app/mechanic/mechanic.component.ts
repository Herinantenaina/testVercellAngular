import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarMechaComponent } from '../component/navbar-mecha/navbar-mecha.component';
import { RouterOutlet , RouterLink} from '@angular/router';

@Component({
  selector: 'app-mechanic',
  imports: [CommonModule, RouterOutlet, NavbarMechaComponent],
  templateUrl: './mechanic.component.html',
  styleUrl: './mechanic.component.scss'
})
export class MechanicComponent {


}
