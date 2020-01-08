import { ExchangeActionTypes } from './exchangeActions';

export interface ExchangeState {
  currencyPair?: string;
  baseAmount: number;
  contraAmount: number;
  isBaseFixed: boolean;
  shouldShowConfirmation?: boolean;
  confirmationBaseAmount?: number;
  confirmationContraAmount?: number;
}

const initialState = {
  baseAmount: 0,
  contraAmount: 0,
  isBaseFixed: true
};

const exchangeReducer = (state: ExchangeState = initialState, action: any) => {
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
    case ExchangeActionTypes.SHOW_CONFIRMATION: {
      return {
        ...state,
        shouldShowConfirmation: true,
        confirmationBaseAmount: action.baseAmount,
        confirmationContraAmount: action.contraAmount
      };
    }
    case ExchangeActionTypes.HIDE_CONFIRMATION: {
      return {
        ...state,
        shouldShowConfirmation: false,
        confirmationBaseAmount: null,
        confirmationContraAmount: null
      };
    }
    default:
      return state;
  }
};

export default exchangeReducer;
