import {Component, OnInit, ViewChild} from '@angular/core';
import { TicketsServiceService} from '../tickets-service.service';
import {Ticket} from './ticket';
import {NgForm} from '@angular/forms';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  @ViewChild('filterForm') ngForm: NgForm;
  currency = 'usd';
  stops = '2';
  rub_rate: number;
  eur_rate: number;

  constructor(
    private tservice: TicketsServiceService,
    private curservice: CurrencyService,
  ) { }

  refreshTickets() {

    this.tservice.getJSON().then((data: object) => {
      this.tickets.length = 0;

      for(const ticket_index in data['tickets']) {
          const ticket = data['tickets'][ticket_index];
          if (this.currency !== 'usd') {
            const rate: number = this.currency === 'rub' ? this.rub_rate  : this.eur_rate;
            console.log('Rate is: ' + rate)
            ticket.price = Math.round(ticket.price * rate);
            console.log((ticket.price * rate));
          }
          if (ticket.stops.toString() === this.stops.toString() || this.stops.toString() === 'all') {
            this.tickets.push(ticket);
          } else {
            continue;

          }
          console.log('ticket_index ' + ticket_index);

        }
        });
  }

    ngOnInit() {
      this.curservice.getRates().subscribe(
        (data: any) => {
            this.rub_rate = data['rates']['RUB'];
            this.eur_rate = data['rates']['EUR'];
            console.log('set rub_rate to ' + this.rub_rate);
            console.log('set eur_rate to ' + this.eur_rate);
        },
        (error) => {
          console.log('Error', error);
        },
      )

      this.ngForm.form.valueChanges.subscribe(x => {
        console.log(this.ngForm.value.currency);
        console.log(this.ngForm.value.stops);

        this.refreshTickets();
      })


      this.refreshTickets();

  }

}
