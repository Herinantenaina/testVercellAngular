import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit',
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
@Input() item: any;
@Input() fields: EditField[] = []
}
