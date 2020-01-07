import { ExchangeAction, ExchangeActionTypes } from './exchangeActions';

export interface ExchangeState {
  currencyPair?: string;
  baseAmount: number;
  contraAmount: number;
  isBaseFixed: boolean;
}

const initialState = {
  baseAmount: 0,
  contraAmount: 0,
  isBaseFixed: true
};

const exchangeReducer = (
  state: ExchangeState = initialState,
  action: ExchangeAction
) => {
  switch (action.type) {
    case ExchangeActionTypes.SET_CURRENCY_PAIR:
      return {
        ...state,
        currencyPair: action.currencyPair
      };

    default:
      return state;
  }
};

export default exchangeReducer;
