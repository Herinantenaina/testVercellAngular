import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations"

@Component({
  selector: 'app-questions',
  imports: [CommonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '0',
          opacity: '0',
          overflow: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '50px',
          opacity: '1',
          overflow: 'visible',
        })
      ),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class QuestionsComponent {
  @Input() question!: string;
  @Input() answer!: string;

  showAnswer: boolean = false;
  ExpandCollapse: string = 'collapsed';

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
