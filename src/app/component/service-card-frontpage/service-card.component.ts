import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-card',
  imports: [],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {
 @Input() price!: string;
 @Input() duration!: string;
 @Input() category!: string;
 @Input() imageUrl!: string;
 @Input() title!: string;
}
