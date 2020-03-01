import { Component, OnInit } from '@angular/core';

import { CalendarEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  constructor() { }

  ngOnInit() {
  }

}
