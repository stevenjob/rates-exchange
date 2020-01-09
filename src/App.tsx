import React from 'react';
import Exchange from './components/exchange';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import * as exchangeActions from './store/exchange/exchangeActions';
import 'bootstrap/dist/css/bootstrap.css';
import 'material-design-icons/iconfont/material-icons.css';

// mock app setup to populate currencies and account balances
const currencies = {
  USD: {
    symbol: '$'
  },
  GBP: {
    symbol: '£'
  },
  EUR: {
    symbol: '€'
  }
};

const accountBalances = {
  USD: 1000,
  EUR: 1000,
  GBP: 1000
};

const store = configureStore({
  currencies,
  accountBalances
});

const currencyPair = 'USDEUR';
store.dispatch(exchangeActions.changeCurrencyPair(currencyPair));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Exchange />
      </div>
    </Provider>
  );
};

export default App;
