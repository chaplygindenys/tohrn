import { ApplicationRef, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap, retry } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import  { Currency } from './currency'
import  { GovUa } from './gov-Ua';
import { MASSIVEGOVUA } from './mock-govUa';

import { Monobank} from './models/monobank';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public mono: Monobank[] = [];
  public monoLength: number = 1111;

  private monoBankUrl = "https://api.monobank.ua/bank/currency";
  private govUaUrl = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json";
  private todosUrl = "https://jsonplaceholder.typicode.com/todos";
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

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'DataType':'json' }),
  };


 private massiveGovUaToCurrencies(massiveGovUa : GovUa[] ) {
   let currencies: Currency[] = []  

  massiveGovUa.map((govUa, key)=>{
     currencies[key].currencyBaseName= "Україрська гривня";
     currencies[key].currencyBaseCodeChar= "UAN";
     currencies[key].currencyBaseCode= 980;
     currencies[key].currencyName= govUa.txt;
     currencies[key].currencyCodeChar= govUa.cc;
     currencies[key].currencyCode= govUa.r030;
     currencies[key].currencyRate= govUa.rate;
     currencies[key].currencyRateToBase= (1/govUa.rate);
     currencies[key].currencyDate= +govUa.exchangedate; })
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

     
   
   
    //  getCurrenciesFromMasssiveMonobank() {
    // let mo: any;
    //   this.getMassiveMonobank()
    //   .subscribe(mono => mo = mono
           
    //      // currencies as any).map((currency:any, key:any)=>(
    //     //  massiveMonobank[key].currencyCodeA = +currency.currencyCodeA,
    //     //  massiveMonobank[key].currencyCodeB = +currency.currencyCodeB,
    //     //  massiveMonobank[key].date = +currency.date,
    //     //  massiveMonobank[key].rateBuy = +currency.rateBuy,
    //     //  massiveMonobank[key].rateCross = +currency.rateCross,
    //     //  massiveMonobank[key].rateSell = +currency.rateSell
    //     // ))
        
    //     );
    //     console.log(mo);
    //     console.log(JSON.parse(mo))

    // };
     getItemFromLocalStorage(url:string):string |null{
      this.setItemToLocalStorage(url);
      const item:string|null = localStorage.getItem(`res-from-${url}`);
      return item;
     };

     setItemToLocalStorage(url:string){
      this.getResponsFromApi(url)
      .subscribe(
        res=>window.localStorage.setItem(
         `res-from-${url}`, JSON.stringify(res)
        )
      );
     };

     getResponsFromApi(url:string):Observable<ArrayBuffer>{ 
      return this.http.get<ArrayBuffer>(url)
   .pipe(
     tap(_ => this.log('fetched massiveMonobank')),
     catchError(this.handleError<ArrayBuffer>('getMassiveMonobank'))
   );
   };
};

