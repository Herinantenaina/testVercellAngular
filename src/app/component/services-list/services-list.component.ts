import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup } from '@angular/forms';
import { ServicesService } from '../../services/create-services/services.service';
import { Service } from '../../models/Service';

@Component({
  selector: 'app-services-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss'
})
export class ServicesListComponent implements OnInit{

  constructor( private serviceService: ServicesService, private cdr: ChangeDetectorRef){}
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  selectedService: any = null;
  services: Service[] = [] ;
  id!: string;
  

  ngOnInit(): void {
    this.loadServices()  ;

  }
  openEditModal(service: Service) {
    this.selectedService = { ...service }; // Create a copy of the Service object
    this.id = this.selectedService._id

    const durationDate = new Date(this.selectedService.serviceEstimatedDuration);
    
    this.selectedService.durationHours = durationDate.getHours();
    this.selectedService.durationMinutes = durationDate.getMinutes()
    console.log(this.selectedService)
    /* const test = new Date(this.selectedService.serviceEstimatedDuration)
    console.log(test) */
    this.isEditModalOpen = true;
  }

  
  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedService = null;
    this.cdr.detectChanges()
  }

  onEdit() {
    // Send the updated data to the backend/database
    this.editService()
    console.log('Updated Service:', this.selectedService);
    this.closeEditModal();
  }
  
  editService(){
    const estimatedDuration = new Date()
    estimatedDuration.setUTCHours(this.selectedService.durationHours, this.selectedService.durationMinutes,0,0) ;
    this.selectedService.serviceEstimatedDuration = estimatedDuration;
    
    this.serviceService.updateService(this.id, this.selectedService).subscribe({
      next: () => {
        this.loadServices()
      },
      error: (err) => console.log('Error while editing', err)
    })
  }


  openDeleteModal(service: Service) {
    this.selectedService = { ...service }
    this.isDeleteModalOpen = true
    this.id = this.selectedService.id || this.selectedService._id
    console.log(this.id)
  }

  closeDeleteModal(){
    this.isDeleteModalOpen = false
    this.selectedService = null
  }

  deleteService(){
    this.serviceService.deleteService(this.id).subscribe({
      next: () => {
        this.isDeleteModalOpen = false;
        this.loadServices();
        console.log('Service deleted');
      },
      error: (err) => console.log('Error while deleting', err)
    })
    
  }


  formatDate(isoString: string | Date): string {
    const date = new Date(isoString);
    
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    let formattedTime =''

    if( hours  != 0 ){
      formattedTime = `${hours}h${minutes.toString().padStart(2, '0')}mn`;
    }
    else{
      formattedTime = `${minutes.toString().padStart(2, '0')}mn`;
    } 
    return ` ${formattedTime}`;
  }

  loadServices(): void{
    this.serviceService.getAllServices().subscribe(data => this.services = data)
  }
}
