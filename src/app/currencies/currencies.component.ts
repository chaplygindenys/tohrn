import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CurrencyService } from '../currency.service';
import { MessageService } from '../message.service';

import  { Currency } from '../currency'
import  { Exchage } from '../exchage/exchage'

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  
  currencies: Currency[] = [];
  currencyExchage = new Exchage(
    "EURO",
    "EUR",
    "987",
    1,
    1,
    "U.S.DOLLAR",
    "USD",
    "840",
    1,
    1,
    "UKRAINIAN HRYVNA",
    "UAN",
    "980",
    1,
    37,
    32
  );
  


  constructor(
    private currencyService: CurrencyService,
    private messageService: MessageService
  ) { };

  ngOnInit(): void {
    this.getCurrencies();
  };
  getCurrencies(): void { 

   const currencies = of(this.currencyService.getCurrenciesFromMasssiveMonobank());
     currencies.subscribe(currencies=>this.currencies= currencies)
   console.log(this.currencies );
  };

  selectCurrencyFirst(currencyName : string): void{
    this.currencies.map((currency)=>
      currency.currencyName === currencyName? 
      this.setCurrencyExchageFirst(currency) : console.log(currency.currencyCodeChar)
    )
  };
  setCurrencyExchageFirst(currency: Currency) {
    this.currencyExchage.currencyCodeCharFirst = currency.currencyCodeChar;
    this.currencyExchage.currencyCodeFirst = currency.currencyCode;
    this.messageService.add(`currrencyComponent: Selected ${currency.currencyCodeChar}`);
  };

  selectCurrencySecond(currencyName : string): void{
      this.currencies.map((currency)=>
        currency.currencyName === currencyName? 
        this.setCurrencyExchageSecond(currency) : console.log(currency.currencyCodeChar)
      )
  }; 
  setCurrencyExchageSecond(currency: Currency) {
      this.currencyExchage.currencyCodeCharSecond = currency.currencyCodeChar
      this.currencyExchage.currencyCodeSecond = currency.currencyCode
  };

  setExchageFirstToSecond(amountFirst:number){
    this.setExchageRateFirst();
    this.currencyExchage.amountSecond =
     (amountFirst * this.currencyExchage.rateFirst);
  };
  setExchageSecondToFirst(amountSecond:number){
    this.setExchageRateSecond();
    this.currencyExchage.amountFirst =
     (amountSecond * this.currencyExchage.rateSecond);
  };

  setExchageRateFirst(){
    this.currencyExchage.rateFirst =
     ((this.currencyExchage.amountBase / 
     this.currencyExchage.rateBaseToSecond)*
     this.currencyExchage.rateBaseToFirst
     );
  };
  setExchageRateSecond(){
    this.currencyExchage.rateSecond =
     ((this.currencyExchage.amountBase / 
     this.currencyExchage.rateBaseToFirst)*
     this.currencyExchage.rateBaseToSecond
     );
  };
 
}
