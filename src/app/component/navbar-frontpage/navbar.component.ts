import { Component, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  //verification si scroll donc changement du 
  isScrolled = false;
  isMenuOpen = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0 ;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.onWindowScroll;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId) ;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }) ;
    }
  }

  @Output() loginClicked = new EventEmitter<void>() ;

  onLoginClick() {
    this.loginClicked.emit()
  }
}
