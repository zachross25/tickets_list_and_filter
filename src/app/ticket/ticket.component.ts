import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from '../tickets/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @Input() ticket: Ticket;
  @Input() currency: string;

  constructor() { }

  ngOnInit(): void {
  }

  addMinutes(date: string, minutes: number) {
    return new Date(Date.parse(date) + (minutes * 1000));
  }

  getHoursAndMinutes(minutes: number) {
    const hours = Math.trunc(minutes / 60);
    const min = minutes - (60 * hours);
    return `${hours}h ${min}m`;
  }
}

