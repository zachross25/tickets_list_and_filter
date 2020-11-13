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
  sortValue = 'cheapest';
  transferVariants: Array<TransferVariant> = [];

  // currencies
  rub_rate: number; // Russian Ruble exchange rate
  eur_rate: number; // EURO exchange rate

  constructor(
    private ticketService: TicketsService,  // service for get tickets
    private currencyService: CurrencyService,  // service for get currency data
  ) {
    // Add tranfer possible variants from 0 to 4 and -1 which means any
    this.transferVariants.push(new TransferVariant('Any', -1, true));
    this.transferVariants.push(new TransferVariant('direct', 0, false));
    this.transferVariants.push(new TransferVariant('1 transfer', 1, false));
    this.transferVariants.push(new TransferVariant('2 transfers', 2, false));
    this.transferVariants.push(new TransferVariant('3 transfers', 3, false));
    this.transferVariants.push(new TransferVariant('4 transfers', 4, false));
  }

  // sort tickets
  sort() {
    if (this.sortValue === 'cheapest') {
      // sort tickets by price ASC
      this.tickets.sort((ticket, next) => {
        if (ticket.price < next.price) {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (this.sortValue === 'fastest') {
      // sort tickets by transfers ASC
      this.tickets.sort((ticket, next) => {
        if (ticket.transfers < next.transfers) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    // limit by 5 tickets
    this.tickets = this.tickets.splice(0, 5);
  }

  // set sort value
  setSort(sort: string) {
    // set sort type
    this.sortValue = sort;

    // sort tickets
    this.sort();
  }

  // toggle tranfer selection
  toggleTransfer(transfer: TransferVariant) {
    console.log('toggle: ', transfer.title);
    transfer.checked = !transfer.checked;

    const variantAny = this.transferVariants.filter((v) => v.value === -1)[0];
    const allExceptAnyEnabled = this.transferVariants
      .filter((v) => v.value !== -1)
      .filter((v) => v.checked);

    // if check any uncheck other variants
    if (transfer.value === -1) {
      allExceptAnyEnabled.map((v) => v.checked = false);
    }

    // uncheck any if select something
    if (allExceptAnyEnabled.length > 0) {
      variantAny.checked = false;
    }

    // set any if nothing selected
    if (this.transferVariants.filter(v => v.checked).length === 0) {
      variantAny.checked = true;
    }

    console.log(this.transferVariants.map((v) => `${v.title}, ${v.checked}`));
    // update tickets
    this.refreshTickets();
  }

  // return array of selected transfer variants
  getTransfersVariants(): Array<number> {
    return this.transferVariants
      .filter((variant) => variant.checked)
      .map((variant) => variant.value);
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
    }).then(() => this.sort());
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
