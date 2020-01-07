import { combineReducers } from 'redux';
import exchangeReducer from './exchange/exchangeReducer';
import ratesReducer from './rates';
import accountBalancesReducer from './accountBalances/accountBalancesReducer';
import currenciesReducer from './currencies/currenciesReducer';

const rootReducer = combineReducers({
  exchange: exchangeReducer,
  rates: ratesReducer,
  accountBalances: accountBalancesReducer,
  currencies: currenciesReducer
});

export default rootReducer;
