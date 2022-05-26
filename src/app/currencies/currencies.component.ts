import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CurrencyService } from '../currency.service';
import { MessageService } from '../message.service';

import  { Currency } from '../currency'
import  { Exchage } from '../exchage/exchage'
import { Monobank } from '../models/monobank';
import { MASSIVEGOVUA } from '../mock-govUa';
import { GovUa } from '../gov-Ua';
import { MASSIVEMONOBANK } from '../mock-massiveMonobank';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  private monoBankUrl = "https://api.monobank.ua/bank/currency";
  private govUaUrl = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json";
  private todosUrl = "https://jsonplaceholder.typicode.com/todos";
  private privatBankUrl = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

   massiveMonobank: Monobank[] =[];
   currencies: Currency[] = [];

  currencyExchage = new Exchage(
    "EURO",
    "EUR",
    987,
    1,
    1,
    "U.S.DOLLAR",
    "USD",
    840,
    1,
    1,
    "UKRAINIAN HRYVNA",
    "UAN",
    980,
    1,
    37,
    32
  );
  


  constructor(
    private currencyService: CurrencyService,
    private messageService: MessageService
  ) { };

  ngOnInit(): void {
    // this.currencyService.setItemToLocalStorage (this.monoBankUrl);
   

  };
   

  private massiveMonobankToCurrencies(massiveMonobank : Monobank[] ) :void{
       this.currencies = [];
    MASSIVEGOVUA.map((govUa:GovUa , key )=>{ 
       massiveMonobank.map((monobank:Monobank) => {
          if(govUa.r030 !== monobank.currencyCodeA || 980 !== monobank.currencyCodeB ){
            console.log(monobank.currencyCodeB);}else{
            
            
           this.currencies.push({ 
             currencyBaseName : "Україрська гривня",
             currencyBaseCodeChar: "UAN",
             currencyBaseCode: 980,
             currencyName: govUa.txt,
             currencyCodeChar: govUa.cc,
             currencyCode: monobank.currencyCodeA,
             currencyRate: (monobank.rateCross? monobank.rateCross : (
                 (monobank.rateBuy?monobank.rateBuy :0)+(monobank.rateSell?monobank.rateSell:0)
                 )/2),
              currencyRateToBase: (1/(monobank.rateCross? monobank.rateCross : (
                (monobank.rateBuy?monobank.rateBuy :0)+(monobank.rateSell?monobank.rateSell:0)
                )/2)),
             currencyDate:monobank.date })
           
            //  if(monobank.currencyCodeB === 980){
            //   currencyBaseName : "Україрська гривня";
            //   currencyBaseCodeChar: "UAN";
            //   currencyBaseCode: 980;
            //   }else{
            //     currencyBaseName: "Долар США";
            //     currencyBaseCodeChar: "USD";
            //     currencyBaseCode: 840;
            //   }; 
            // currencyName: govUa.txt;
            // currencyCodeChar: govUa.cc;
            // currencyCode: monobank.currencyCodeA;
            // currencyRate: (
            //   monobank.rateCross? monobank.rateCross : (
            //     (monobank.rateBuy?monobank.rateBuy :0)+(monobank.rateSell?monobank.rateSell:0)
            //     )/2);
            // currencyRateToBase: (1/this.currencies[key].currencyRate);
            // currencyDate:monobank.date; 
            //   })

          }
        })
    });
    console.log(this.currencies);
  };

  getJsonfromLocalStorage(name:string): void { 
    let url:string = this.monoBankUrl;
    let jsonlocalStorage : string|null = this.monoBankUrl;
    switch (name) {
      case 'Monobank': 
      url =this.monoBankUrl;
      jsonlocalStorage = this.currencyService.getItemFromLocalStorage(url);
       if (jsonlocalStorage !== null){
       this.setMonobankExchage(jsonlocalStorage);
      };
       break;
      case 'Todo': url= this.todosUrl;
      jsonlocalStorage = this.currencyService.getItemFromLocalStorage(url);
       if (jsonlocalStorage !== null){
       this.setTodoExchage(jsonlocalStorage);
      };
      break;
      case 'Privatbank': 
      url= this.privatBankUrl;
      jsonlocalStorage = this.currencyService.getItemFromLocalStorage(url);
       if (jsonlocalStorage !== null){
       this.setPrivatbankExchage(jsonlocalStorage);
      };
      break;
      default: break; 
    };
  };

  setMonobankExchage(jsonMonobank:string){
  //  this.massiveMonobank = JSON.parse(jsonMonobank);
  //  console.log(this.massiveMonobank);
   this.massiveMonobankToCurrencies(MASSIVEMONOBANK);
  };

  setTodoExchage(jsonTodo:string){

  };

  setPrivatbankExchage(jsonPrivatbank:string){

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
