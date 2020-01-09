export enum CurrenciesActionTypes {
  SET_CURRENCIES = 'SET_CURRENCIES'
}

export const setCurrencies = (currencies: { [currency: string]: any }) => ({
  type: CurrenciesActionTypes.SET_CURRENCIES,
  currencies
});
