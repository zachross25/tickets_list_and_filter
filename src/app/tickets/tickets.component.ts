import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketsService } from '../tickets-service.service';
import { Ticket } from './ticket';
import { NgForm } from '@angular/forms';
import { CurrencyService } from '../currency.service';
import { TransferVariant } from './transfervariant';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  @ViewChild('filterForm', { static: false }) ngForm: NgForm;
  tickets: Ticket[] = []; // tickets list
  currency = 'usd'; // current currency
  tranferVariants: Array<TransferVariant> = [];

  // currencies
  rub_rate: number; // Russian Ruble exchange rate
  eur_rate: number; // EURO exchange rate

  constructor(
    private ticketService: TicketsService,  // service for get tickets
    private currencyService: CurrencyService,  // service for get currency data
  ) {
    this.tranferVariants.push(new TransferVariant('Any', -1, false));
    this.tranferVariants.push(new TransferVariant('Only direct', 0, false));
    this.tranferVariants.push(new TransferVariant('1 transfer', 1, true));
    this.tranferVariants.push(new TransferVariant('2 transfers', 2, false));
    this.tranferVariants.push(new TransferVariant('3 transfers', 3, false));
    this.tranferVariants.push(new TransferVariant('4 transfers', 4, false));
  }

  toggleTransfer(transfer: TransferVariant) {
    transfer.checked = !transfer.checked;
    this.refreshTickets();
  }

  getTransfersVariants() {
    return this.tranferVariants
      .filter((variant) => variant.checked).map((variant) => variant.value);
  }
  refreshTickets() {
    const variants: Array<number> = this.getTransfersVariants();
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
        if (variants.includes(ticket.transfers) || variants.includes(-1)) {
          // if the ticket route match the transfers count display this ticket
          this.tickets.push(ticket);
        }
      }
    });
  }

  ngOnInit() {
    this.currencyService.getRates().subscribe(
      (data: any) => {
        this.rub_rate = data['rates']['RUB'];
        this.eur_rate = data['rates']['EUR'];

        this.ngForm.form.valueChanges.subscribe(x => {
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
