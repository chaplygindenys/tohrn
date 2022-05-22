import { Component, OnInit } from '@angular/core';
import { Currency } from '../currency';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currencies : Currency[] = [];

  constructor(
    private currencyService : CurrencyService
  ) { };

  ngOnInit(): void {
    this.getCurrencies();
  };

  getCurrencies(): void {
  this.currencyService.getCurrency()
    .subscribe(currencies => this.currencies = currencies);
  };
};
