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
    case ExchangeActionTypes.SET_BASE_AMOUNT: {
      return {
        ...state,
        baseAmount: action.amount
      };
    }
    case ExchangeActionTypes.SET_CONTRA_AMOUNT: {
      return {
        ...state,
        contraAmount: action.amount
      };
    }
    case ExchangeActionTypes.SET_BASE_FIXED: {
      return {
        ...state,
        isBaseFixed: true
      };
    }
    case ExchangeActionTypes.SET_CONTRA_FIXED: {
      return {
        ...state,
        isBaseFixed: false
      };
    }
    default:
      return state;
  }
};

export default exchangeReducer;
