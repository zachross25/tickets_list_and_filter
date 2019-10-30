import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatGridListModule, MatButtonModule,  MatListModule, MatCheckboxModule} from '@angular/material';

import { AppComponent } from './app.component';
import { TicketsComponent } from './tickets/tickets.component';
import {RouterModule} from '@angular/router';
import {TicketsServiceService} from './tickets-service.service';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CurrencyService} from './currency.service';

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent
  ],
  imports: [
    MatButtonModule, MatCheckboxModule, MatListModule, MatGridListModule, MatCardModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpClientModule, TicketsServiceService, CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
