import React from 'react';
import Exchange from './components/exchange';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { changeCurrencyPair } from './store/exchange/exchangeActions';

// mock app setup to populate currencies and account balances

const currencies = {
  usd: {
    symbol: '$'
  },
  gbp: {
    symbol: '£'
  },
  eur: {
    symbol: '€'
  }
};

const accountBalances = {
  usd: 1000,
  eur: 1000,
  gbp: 1000
};

const store = configureStore({
  currencies,
  accountBalances
});

const currencyPair = 'usdeur';
store.dispatch(changeCurrencyPair(currencyPair));

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
