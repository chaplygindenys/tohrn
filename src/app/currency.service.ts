import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import  { Currency } from './currency'
import  { CURRENCIES } from './mock-currencies'

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private messageService: MessageService) { };

  getCurrency():Observable<Currency[]> {
    const currency = of(CURRENCIES);
    this.messageService.add('service: fetched currrencies')
    return currency;
  };
};

