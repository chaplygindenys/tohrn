import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import  { Currency } from './currency'
import  { CURRENCIES } from './mock-currencies'

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  getCurrency():Observable<Currency[]> {
    const currency = of(CURRENCIES);
    return currency;
  };
};

