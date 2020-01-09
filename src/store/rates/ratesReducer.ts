import { RatesActionTypes, RatesAction } from './ratesActions';

export interface RatesState {
  [rate: string]: number;
}

const ratesReducer = (state: RatesState = {}, action: RatesAction) => {
  if (action.type === RatesActionTypes.SET_RATES) {
    return {
      ...state,
      ...action.rates
    };
  }

  return state;
};

export default ratesReducer;
