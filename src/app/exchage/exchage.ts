export class Exchage {

    constructor(
        public currencyNameFirst:string,
        public currencyCodeCharFirst:string,
        public currencyCodeFirst:string,
        public amountFirst:number,
        public rateFirst:number, 
        public currencyNameSecond:string,
        public currencyCodeCharSecond:string,
        public currencyCodeSecond:string,
        public amountSecond:number,
        public rateSecond:number,
        public currencyNameBase:string,
        public currencyCodeCharBase:string,
        public currencyCodeBase:string,
        public amountBase:number,
        public rateBaseToFirst:number,
        public rateBaseToSecond:number,

    ){}
}