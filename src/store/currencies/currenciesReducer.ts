import { CurrenciesActionTypes } from './currenciesActions';

export interface CurrenciesState {
  [currencyName: string]: { symbol: string };
}

const currenciesReducer = (state: CurrenciesState = {}, action: any) => {
  if (action.type === CurrenciesActionTypes.SET_CURRENCIES) {
    return {
      ...state,
      ...action.currencies
    };
  }

  return state;
};

export default currenciesReducer;
