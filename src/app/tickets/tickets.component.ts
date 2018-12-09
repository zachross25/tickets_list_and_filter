import {Component, OnInit, ViewChild} from '@angular/core';
import { TicketsServiceService} from '../tickets-service.service';
import {Ticket} from './ticket';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  @ViewChild('filterForm') ngForm: NgForm;
  currency: string = 'rub';
  stops: string = '2';
  usd_rate: number = 0.015;
  eur_rate: number = 0.013;

  constructor(
    private tservice: TicketsServiceService
  ) { }

  refreshTickets() {
    this.tickets.length = 0;
    this.tservice.getJSON().then((data: object) => {
      for ( const ticket_index in data['tickets']) {
          const ticket = data['tickets'][ticket_index];
          if (this.currency !== 'rub') {
            const rate: number = this.currency === 'usd' ? this.usd_rate  : this.eur_rate;
            console.log(rate)
            ticket.price = Math.round(ticket.price * rate);
            console.log((ticket.price * rate));
          }
          if (ticket.stops.toString() === this.stops.toString() || this.stops.toString() === 'all') {
            this.tickets.push(ticket);
          } else {
            continue;

          }


        }
        });
  }

    ngOnInit() {
      this.ngForm.form.valueChanges.subscribe(x => {
        //console.log( this.currency, this.stops);
        console.log(this.ngForm.value.currency);
        console.log(this.ngForm.value.stops);

        this.refreshTickets();
      })


      this.refreshTickets();

  }

}
