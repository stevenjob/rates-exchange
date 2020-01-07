enum RatesActionTypes {
  UPDATE_RATES = 'UPDATE_RATES'
}

export interface UpdateRatesAction {
  type: RatesActionTypes.UPDATE_RATES;
  rates: { string: number };
}

export const updateRates = (rates: { [rate: string]: number }) => ({
  type: RatesActionTypes.UPDATE_RATES,
  rates
});

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
