import { RatesActionTypes, UpdateRatesAction } from './ratesActions';

export interface RatesState {
  [rate: string]: number;
}

const ratesReducer = (state: RatesState = {}, action: UpdateRatesAction) => {
  if (action.type === RatesActionTypes.UPDATE_RATES) {
    console.log(state, action);
    return {
      ...state,
      ...action.rates
    };
  }

  return state;
};

export default ratesReducer;
