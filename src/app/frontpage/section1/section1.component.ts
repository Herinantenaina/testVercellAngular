import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section1',
  imports: [],
  templateUrl: './section1.component.html',
  styleUrl: './section1.component.scss'
})
export class Section1Component {

  constructor(
    private router: Router
  ) {

  }

  onCreateClick() {
    this.router.navigate(['/signUp'])
  }
}
