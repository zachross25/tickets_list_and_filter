import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketsService } from '../tickets-service.service';
import { Ticket } from './ticket';
import { NgForm } from '@angular/forms';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  @ViewChild('filterForm', { static: false }) ngForm: NgForm;
  tickets: Ticket[] = []; // tickets list
  currency = 'usd'; // current currency
  transfers = '0'; // transfers count
  // currencies
  rub_rate: number; // Russian Ruble exchange rate
  eur_rate: number; // EURO exchange rate

  constructor(
    private ticketService: TicketsService,  // service for get tickets
    private currencyService: CurrencyService,  // service for get currency data
  ) {
  }

  refreshTickets() {
    this.ticketService.getJSON().then((data: object) => {
      // reset tickets
      this.tickets.length = 0;

      // generate new tickets list
      for (const ticket of data['tickets']) {
        if (this.currency !== 'usd') {
          // our base currency is USD. If USD is selected just display the price
          // or change price if currency is not USD
          const rate: number = this.currency === 'rub' ? this.rub_rate : this.eur_rate;
          ticket.price = Math.round(ticket.price * rate);
        }
        if (ticket.transfers.toString() === this.transfers.toString() || this.transfers.toString() === 'any') {
          // if the ticket route match the transfers count display this ticket
          this.tickets.push(ticket);
        } else {
          // skip this ticket
          continue;
        }
      }
    });
  }

  ngOnInit() {
    this.currencyService.getRates().subscribe(
      (data: any) => {
        this.rub_rate = data['rates']['RUB'];
        this.eur_rate = data['rates']['EUR'];
        console.log('set rub_rate to ' + this.rub_rate);
        console.log('set eur_rate to ' + this.eur_rate);

        this.ngForm.form.valueChanges.subscribe(x => {
          console.log('####\nselected currency: ' + this.ngForm.value.currency);
          console.log('selected transfers: ' + this.ngForm.value.transfers);
          this.refreshTickets();
        });


        this.refreshTickets();
      },
      (error) => {
        console.log('Error', error);
      },
    );


  }

}
