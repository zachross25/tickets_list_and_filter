import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule,  } from '@angular/material/grid-list';
import { MatListModule,  } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { TicketsComponent } from './tickets/tickets.component';
import {RouterModule} from '@angular/router';
import {TicketsService} from './tickets-service.service';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CurrencyService} from './currency.service';
import { TicketComponent } from './ticket/ticket.component';
import { PlaneLogoComponent } from './plane-logo/plane-logo.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    TicketComponent,
    PlaneLogoComponent
  ],
  imports: [
    MatButtonModule, MatCheckboxModule, MatListModule, MatGridListModule, MatCardModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpClientModule, TicketsService, CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
