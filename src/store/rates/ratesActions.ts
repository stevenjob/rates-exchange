import * as exchangeActions from '../exchange/exchangeActions';

export enum RatesActionTypes {
  SET_RATES = 'SET_RATES'
}

export interface SetRatesAction {
  type: RatesActionTypes.SET_RATES;
  rates: { [rate: string]: number };
}

export type RatesAction = SetRatesAction;

export const updateRates = (rates: { [rate: string]: number }) => (
  dispatch: any
) => {
  dispatch(setRates(rates));
  dispatch(exchangeActions.recalculateNonFixedAmount());
};

const setRates = (rates: { [rate: string]: number }): SetRatesAction => ({
  type: RatesActionTypes.SET_RATES,
  rates
});
