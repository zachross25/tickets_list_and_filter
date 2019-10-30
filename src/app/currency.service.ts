import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }
  public getRates<T>(): Observable<T> {
    return this.http.get<T>('https://api.ratesapi.io/api/latest?base=USD');
  }
}
