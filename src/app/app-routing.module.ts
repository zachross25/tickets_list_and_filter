import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
    { path: '', redirectTo: '/tickets-list', pathMatch: 'full'},
    { path: 'ticket', component: TicketComponent, pathMatch: 'full' },
    { path: 'tickets-list', component: TicketsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
