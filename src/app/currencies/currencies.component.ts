import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import  { Currency } from '../currency'
import  { CURRENCIES } from '../mock-currencies'
import  { Exchage } from '../exchage/exchage'

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  
  currencies = CURRENCIES;
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
    1,);
  


  constructor() { }

  ngOnInit(): void {
  }
  

  selectCurrencyFirst(currencyName : string): void{
    this.currencies.map((currency)=>
      currency.currencyName === currencyName? 
      this.setCurrencyExchageFirst(currency) : console.log(currency.currencyCodeChar)
    )
  };
  setCurrencyExchageFirst(currency: Currency) {
    this.currencyExchage.currencyCodeCharFirst = currency.currencyCodeChar
    this.currencyExchage.currencyCodeFirst = currency.currencyCode
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
    console.log(amountFirst)
  };
  setExchageSecondToFirst(amountSecond:number){
    console.log(amountSecond)
  };

}
