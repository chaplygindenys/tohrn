import { Component, OnInit } from '@angular/core';

import { Currency } from '../currency';
import { CurrencyService } from '../currency.service';
import { GovUa } from '../gov-Ua';
import { Monobank } from '../monobank';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currencies: Currency[] = [];
  massiveMonobank: Monobank[]=[];
  massiveGovUa: GovUa[] = [];

  constructor(
    private currencyService : CurrencyService
  ) { };

  ngOnInit(): void {
  
  };
  
  

  getCurrencies(): void {
    this.currencyService.getMassiveMonobank()
    .subscribe(heroes => this.massiveMonobank = heroes);
   console.log(this.massiveMonobank );
  };
};
