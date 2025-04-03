import { Component, EventEmitter, Output } from '@angular/core';
import { NavbarComponent } from '../../component/navbar-frontpage/navbar.component';

@Component({
  selector: 'app-header',
  imports: [
    NavbarComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() loginClicked = new EventEmitter<void>();

  onLoginClick() {
    this.loginClicked.emit();
  }
}
