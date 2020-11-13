import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from './tickets/ticket';

interface ResponseObject {
  tickets: Array<Ticket>;
  ok: boolean;
  error: string;
  stop: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class TicketsService {
  APIkey: string | null = null;

  constructor(private http: HttpClient) {
  }

  public async getKey(): Promise<any> {
    return this.http.get<any>('https://front-test.beta.aviasales.ru/search').toPromise();
  }

  public async getJSON(): Promise<ResponseObject> {
    if (!this.APIkey) {
      await this.getKey()
        .then((response) => {
          this.APIkey = response.searchId;
        });
    }

    return this.http.get<ResponseObject>(`https://front-test.beta.aviasales.ru/tickets?searchId=${this.APIkey}`)
      .toPromise()
      .then(async (data) => {
        if (!data.tickets) {
          console.log('empty response?');
          this.APIkey = null;
          return this.getJSON();
        } else {
          return data;
        }
      })
      .catch(async (err) => {
        console.log(err.error);
        this.APIkey = null;
        return this.getJSON();
      });
  }
}

