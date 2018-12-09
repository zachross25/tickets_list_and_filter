import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Ticket} from './tickets/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsServiceService {


  constructor(private http: HttpClient) {
  }

  public getJSON(): Promise<Ticket[]> {
    return this.http.get<Ticket[]>('./assets/tickets.json').toPromise();
  }

}




