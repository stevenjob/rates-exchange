import * as React from 'react';
import SwitchCurrencies from './switchCurrencies';
import ExchangeRate from './exchangeRate';
import BaseExchangePanel from './baseExchangePanel';
import ContraExchangePanel from './contraExchangePanel';
import { useSelector } from 'react-redux';
import * as currenciesSelectors from '../store/currencies/currenciesSelectors';

export interface ExchangeProps {}

function Exchange(props: ExchangeProps) {
  const currencies = useSelector(currenciesSelectors.getCurrenices);

  return (
    <div>
      <header>Exchange</header>
      <section>
        <BaseExchangePanel currencies={currencies} />
        <div>
          <SwitchCurrencies onClick={() => console.log('clicked')} />
          <ExchangeRate />
        </div>
        <ContraExchangePanel currencies={currencies} />
      </section>
    </div>
  );
}

export default Exchange;
