import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports : [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  weeks: (Date | null)[][] = [];
  events: { [key: string]: number } = {}; // Example: { '2023-10-05': 3 }
  current_date: string = '';

  ngOnInit(): void {
    this.generateCalendar(new Date().getFullYear(), new Date().getMonth());
    this.mockEvents(); // Mock some events for demonstration
    this.getCurrentDate();
  }

  getCurrentDate(): void{
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0'); // Ensures two digits
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Get month (0-based)
    const year = today.getFullYear(); // Get the current year

    this.current_date = `${day}/${month}/${year}`; // Format date as 'dd/mm/yyyy'
  }

  // Generate the calendar grid for a given year and month
  generateCalendar(year: number, month: number): void {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDay = firstDayOfMonth.getDay(); // Day of the week (0 = Sunday, 6 = Saturday)
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
      if (dayCount > daysInMonth) break; // Stop if we've added all days
    }
  }

  // Mock some events for demonstration
  mockEvents(): void {
    this.events['2025-3-17'] = 3;
    this.events['2025-3-22'] = 1;
    this.events['2025-3-14'] = 5;
  }

  // Get the number of events for a specific date
  getEventCount(date: Date): number {
    const key = date.toISOString().split('T')[0]; // Convert date to 'YYYY-MM-DD' format
    return this.events[key] || 0;
  }
}