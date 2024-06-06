import { Component } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';// useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FileService } from '../service/file.service';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],  // Include plugins here
    initialView: 'dayGridMonth',
    weekends: true,
    eventColor: 'blue',
    dateClick: this.handleDateClick.bind(this)  // Ensure 'this' context is correct
  };

  eventsPromise!: Promise<EventInput[]>;

  handleDateClick(arg: DateClickArg) {
    alert('Date click! ' + arg.dateStr);
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
  events: EventInput[] = [];
  constructor(private dataService:  FileService) { }

  ngOnInit(): void {
    const email = localStorage.getItem('email')!;

    // Call the service method to fetch documents by email
    this.dataService.getDocumentsByEmail(email).subscribe(data => {
      console.log('Fetched data:', data);
      this.events = this.formatEventData(data);
      console.log('Formatted events:', this.events);
    });
  }

  formatEventData(data: any[]): EventInput[] {
    return data.map(item => ({
      title: item.Account_Name,
      start: new Date(item.followUpDate),
      color: 'green', // Event color set to green
      display: 'block',
      borderColor: 'black',
      backgroundColor: 'green',
      textColor: 'black',
      extendedProps: {
        additionalNotes: item.additionalNotes
        // Add other extended properties if needed
      }
    }));
  }
}
