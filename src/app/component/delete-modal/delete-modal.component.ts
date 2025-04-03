import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-modal',
  imports: [
    CommonModule
  ],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  showDeleteModal: boolean = false;
  itemId: string  = '';

  constructor(
  ){}
    @Input() desc! : string ;
    @Output() confirmDelete = new EventEmitter<string>();

    openModal(id: string): void {
      this.showDeleteModal = true;
      this.itemId = id;
    }

    closeModal(): void {
      this.showDeleteModal = false;
      this.itemId = '';
    }

    deleteItem(): void {
      if (!this.itemId !== null) {
        this.confirmDelete.emit(this.itemId);
      }
      
      this.closeModal();
    }
}
