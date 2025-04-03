import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/customer-services/customer-appointment-services/appointment.service';
import { Appointment } from '../../models/appointment';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-calendar',
  imports : [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [AppointmentService]
})
export class CalendarComponent implements OnInit {

  constructor(private appointmentService: AppointmentService){}

  appointments: any[] = [];
  weeks: (Date | null)[][] = [];
  events: { [key: string]: number } = {}; // Example: { '2023-10-05': 3 }
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  today: Date = new Date();

  ngOnInit(): void {
    this.generateCalendar(new Date().getFullYear(), new Date().getMonth());
    this.mockEvents(); // Mock some events for demonstration
  }

  isToday(date: Date): boolean {
    return (
      date.getDate() === this.today.getDate() &&
      date.getMonth() === this.today.getMonth() &&
      date.getFullYear() === this.today.getFullYear()
    );
  }
  
  generateCalendar(year: number, month: number): void {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDay = firstDayOfMonth.getDay(); 
    const daysInMonth = lastDayOfMonth.getDate();

    let dayCount = 1;
    this.weeks = [];

    for (let week = 0; week < 6; week++) {
      const days: (Date | null)[] = [] ; 
      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < startDay) || dayCount > daysInMonth) {
          days.push(null); // Empty day (not part of the current month)
        } else {
          days.push(new Date(year, month, dayCount));
          dayCount++;
        }
      }
      this.weeks.push(days);
      if (dayCount > daysInMonth) break; 
    }
  }

  mockEvents(): void {
    this.appointmentService.getAppointments().subscribe(data => {
      this.events = {};

      data.forEach((appointment: Appointment) => {
        const key = new Date(appointment.appoDate).toISOString().split('T')[0];
        this.events[key] = (this.events[key] || 0) + 1;      
      })
    })
  }

  getEventCount(date: Date): number {
    const key = date.toLocaleDateString('en-CA');
    return this.events[key] || 0;
  }
}