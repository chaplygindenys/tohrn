import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { Monobank } from './monobank';
import  { Currency } from './currency'
import  { GovUa } from './gov-Ua';
import { MASSIVEGOVUA } from './mock-govUa';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private monoBankUrl = "https://api.monobank.ua/bank/currency";
  private govUaUrl = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json";

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { };

  private log(message: string) {
    this.messageService.add(`CurrrencyService: ${message}`);
  };

      /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
   };

 private massiveGovUaToCurrencies(massiveGovUa : GovUa[] ) {
   let currencies: Currency[] = []  

  massiveGovUa.map((govUa, key)=>{
     currencies[key].currencyBaseName= "Україрська гривня";
     currencies[key].currencyBaseCodeChar= "UAN";
     currencies[key].currencyBaseCode= "980";
     currencies[key].currencyName= govUa.txt;
     currencies[key].currencyCodeChar= govUa.cc;
     currencies[key].currencyCode= govUa.r030.toString();
     currencies[key].currencyRate= govUa.rate;
     currencies[key].currencyRateToBase= (1/govUa.rate);
     currencies[key].currencyDate= govUa.exchangedate; })
  return currencies;
  }


  getCurrenciesFromMasssiveGovUa():Currency[] {
   let massiveGovUa: GovUa[] = [];
   this.getMassiveGoUa()
     .subscribe(currencies => massiveGovUa = currencies);
     return this.massiveGovUaToCurrencies(massiveGovUa);
 };

    getMassiveGoUa():Observable<GovUa[]> { 
       return this.http.get<GovUa[]>(this.govUaUrl)
    .pipe(
      tap(_ => this.log('fetched massiveGovUajjhjh')),
      catchError(this.handleError<GovUa[]>('getMassiveGoUA', []))
    );
     };

     private massiveMonobankToCurrencies(massiveMonobank : Monobank[] ) :Currency[] {
      let currencies: Currency[] = [];

      MASSIVEGOVUA.map((govUa:GovUa  , index)=>{
         massiveMonobank.map((monobank:Monobank, key)=>{
            if(govUa.r030 === monobank.currencyCodeA ){
              currencies[key].currencyBaseName= "Україрська гривня";
              currencies[key].currencyBaseCodeChar= "UAN";
              currencies[key].currencyBaseCode= "980";
              currencies[key].currencyName= govUa.txt;
              currencies[key].currencyCodeChar= govUa.cc;
              currencies[key].currencyCode= monobank.currencyCodeA.toString();
              currencies[key].currencyRate= (
                monobank.rateCross? monobank.rateCross : (
                  (monobank.rateBuy?monobank.rateBuy :0)+(monobank.rateSell?monobank.rateSell:0)
                  )/2);
              currencies[key].currencyRateToBase= (1/currencies[key].currencyRate);
              currencies[key].currencyDate= monobank.date.toString(); 
            }
          })
      });
     return currencies;
    };
   
   
     getCurrenciesFromMasssiveMonobank():Currency[] {
      let massiveMonobank: Monobank[] = [];
      this.getMassiveMonobank()
        .subscribe(currencies => massiveMonobank = currencies);
        console.log(massiveMonobank )
        return this.massiveMonobankToCurrencies(massiveMonobank);
    };


     getMassiveMonobank():Observable<Monobank[]> { 
      return this.http.get<Monobank[]>(this.monoBankUrl)
   .pipe(
     tap(_ => this.log('fetched massiveMonobank')),
     catchError(this.handleError<Monobank[]>('getMassiveMonobank', []))
   );
   };
};

