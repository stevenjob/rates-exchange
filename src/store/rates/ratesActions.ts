import * as exchangeActions from '../exchange/exchangeActions';

export enum RatesActionTypes {
  SET_RATES = 'SET_RATES'
}

export interface UpdateRatesAction {
  type: RatesActionTypes.SET_RATES;
  rates: { string: number };
}

export type RatesAction = UpdateRatesAction;

export const updateRates = (rates: { [rate: string]: number }) => (
  dispatch: any
) => {
  dispatch(setRates(rates));
  dispatch(exchangeActions.recalculateNonFixedAmount());
};

const setRates = (rates: { [rate: string]: number }) => ({
  type: RatesActionTypes.SET_RATES,
  rates
});
