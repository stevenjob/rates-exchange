export interface CurrenciesState {
  [currencyName: string]: { symbol: string };
}

const currenciesReducer = (state: CurrenciesState = {}, action: any) => {
  return state;
};

export default currenciesReducer;
