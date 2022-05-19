import { Component, OnInit } from '@angular/core';
import  {Currency} from '../currency'

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  
  currency: Currency = { 
    "r030":36,"txt":"Австралійський долар","rate":20.5208,"cc":"AUD","exchangedate":"19.05.2022"
     };

  constructor() { }

  ngOnInit(): void {
  }

}
