import * as React from 'react';
import SwitchCurrencies from './switchCurrencies';
import ExchangeRate from './exchangeRate';
import BaseExchangePanel from './baseExchangePanel';
import ContraExchangePanel from './contraExchangePanel';
import ExchangeButton from './exchangeButton';
import * as exchangeActions from '../store/exchange/exchangeActions';
import { Container, Row, Col } from 'reactstrap';
import { useDispatch } from 'react-redux';

function ExchangeForm() {
  const dispatch = useDispatch();
  return (
    <>
      <BaseExchangePanel />
      <Row>
        <Col>
          <SwitchCurrencies
            onClick={() => dispatch(exchangeActions.onSwitchCurrencies())}
          />
        </Col>
        <Col>
          <ExchangeRate />
        </Col>
      </Row>
      <ContraExchangePanel />
      <ExchangeButton />
    </>
  );
}

export default ExchangeForm;
