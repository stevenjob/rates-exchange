import * as React from 'react';
import ExchangeRate from './exchangeRate';
import * as ratesActions from '../store/rates/ratesActions';
import renderWithRedux from '../testUtils/renderWithRedux';

test('gets exchange rate data and displays it', () => {
  const mockStore = {
    rates: {
      EURUSD: 1.114
    },
    currencies: {
      USD: {
        symbol: '$'
      },
      GBP: {
        symbol: '£'
      },
      EUR: {
        symbol: '€'
      }
    },
    exchange: {
      currencyPair: 'EURUSD'
    }
  };

  const { getByTestId, store } = renderWithRedux(<ExchangeRate />, mockStore);

  expect(getByTestId('exchange-rate')).toHaveTextContent('€1 = $1.114');

  store.dispatch(ratesActions.updateRates({ EURUSD: 1.119 }));

  expect(getByTestId('exchange-rate')).toHaveTextContent('€1 = $1.119');
  store.dispatch(ratesActions.updateRates({ USDGBP: 0.766 }));
  expect(getByTestId('exchange-rate')).toHaveTextContent('€1 = $1.119');
});
