import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @Input() price: number;
  @Input() depart: string;
  @Input() arrive: string;
  @Input() flightTime: number;
  @Input() afrom: string;
  @Input() ato: string;
  @Input() transfers: string[];
  @Input() currency: string;
  @Input() carrier: string;

  constructor() { }

  ngOnInit(): void {
  }

}
