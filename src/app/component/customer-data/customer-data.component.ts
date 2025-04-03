import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User';
import { MechanicService } from '../../services/add-mechanic/mechanic.service';

@Component({
  selector: 'app-customer-data',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-data.component.html',
  styleUrl: './customer-data.component.scss'
})
export class CustomerDataComponent implements OnInit{

  constructor(private userService: MechanicService, private cdr: ChangeDetectorRef){}
  
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  selectedUser: any = null;
  users: User[] = [];
  id!: string;
  
  ngOnInit(): void {
    this.loadUsers();
  }

  openEditModal(user: User) {
    this.selectedUser = { ...user };
    this.isEditModalOpen = true;
    this.id = this.selectedUser.id || this.selectedUser._id
  }

  
  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedUser = null;
    this.cdr.detectChanges()
  }

  onSubmit() {
    // Send the updated data to the backend/database here
    this.selectedUser.updatedAt = new Date()
    this.editUser();
    console.log('Updated User:', this.selectedUser);
    this.closeEditModal();
    this.cdr.detectChanges()
  }

  editUser(){
    this.userService.updateMechanic(this.selectedUser,this.id).subscribe({
      next: () =>{
        this.loadUsers()
      },
      error: (err) => console.error('While editing user', err)
    })
  }

  openDeleteModal(user: User) {
    this.selectedUser = { ...user }
    this.isDeleteModalOpen = true
  }

  closeDeleteModal(){
    this.isDeleteModalOpen = false
    this.selectedUser = null
  }

  delete(){
    this.userService.deleteMechanic(this.id).subscribe({
      next: () =>{
        this.isDeleteModalOpen = false;
        this.loadUsers();
        console.log('User deleted');
      },
      error: (err) => console.error('Error while editing', err)
    })
  }

  loadUsers(){
    this.userService.getAllMechanics().subscribe(data =>{ 
      this.users = data;
      this.users = this.users.filter(user => user.role === 'customer');
    })
  }

  phoneNumberInput(phone: any): string {
    const phoneStr = phone.toString().replace(/\D/g, '');  
    return phoneStr.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4'); 
  }
}
