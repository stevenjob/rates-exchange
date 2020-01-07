import { ExchangeState } from './exchange/exchangeReducer';
import { RatesState } from './rates/ratesReducer';
import { AccountBalancesState } from './accountBalances/accountBalancesReducer';
import { CurrenciesState } from './currencies/currenciesReducer';

interface StoreState {
  exchange: ExchangeState;
  accountBalances: AccountBalancesState;
  rates: RatesState;
  currencies: CurrenciesState;
}

export default StoreState;
