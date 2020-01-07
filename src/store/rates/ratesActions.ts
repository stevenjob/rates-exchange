export enum RatesActionTypes {
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
