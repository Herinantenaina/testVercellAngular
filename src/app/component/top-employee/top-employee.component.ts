import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Count } from '../../models/count';
import { CountService } from '../../services/count-services/count.service';
import { AppointmentService } from '../../services/customer-services/customer-appointment-services/appointment.service';
import { Appointment } from '../../models/appointment';
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-top-employee',
  imports: [ CommonModule ],
  templateUrl: './top-employee.component.html',
  styleUrls: ['./top-employee.component.scss']
})
export class TopEmployeeComponent implements OnInit {

  isExpanded = false;

  constructor( 
    private countService: CountService, 
    private appointmentService: AppointmentService
  ) {}

  count= 0;
  val = 0

  async ngOnInit() {
    await this.loadData()
  }

  async loadData() {
    try {
      const percentage = await this.getData();
      this.percentage = percentage

      const count = await this.getThisMonth();
      this.count = count
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async getData(): Promise<number> {
    const data = await firstValueFrom(this.appointmentService.getStat());
    return Number(data.percentageDifference);
  }

  async getThisMonth(): Promise<number>{
    const data = await firstValueFrom(this.countService.get())
    return data
  }
  @Input() percentage: number = 0;
  @Input() color: string = '#4CAF50';
  @Input() warningColor: string = '#F44336';

  radius = 50;
  circumference = 2 * Math.PI * this.radius;
  
  get dashOffset(): number {
    return this.circumference - (this.percentage / 100 * this.circumference);
  }

}