export interface VisaResponse {
    conversionRate: string;
    destinationAmount: string;
    rateProductCode: string;
    markupRateApplied: string;
    sourceAmountWithoutMarkup: string;
    acquirerDetails: {
        settlement: {
            currencyCode:string;
            amount:string;
            conversionRate: string;
        }
    }
};