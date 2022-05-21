export interface VisaRequerst {
    acquirerDetails: {
      settlement: {
        currencyCode:string;
      };
    };
    rateProductCode: string;
    destinationCurrencyCode: string;
    sourceCurrencyCode: string;
    destinationAmount: string;
  }