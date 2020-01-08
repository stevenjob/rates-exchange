import * as React from 'react';
import SwitchCurrencies from './switchCurrencies';
import ExchangeRate from './exchangeRate';
import BaseExchangePanel from './baseExchangePanel';
import ContraExchangePanel from './contraExchangePanel';
import ExchangeButton from './exchangeButton';
import * as exchangeActions from '../store/exchange/exchangeActions';
import { Container, Row, Col, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as exchangeSelectors from '../store/exchange/exchangeSelectors';
import formatAmount from '../formatAmount';

function ExchangeForm() {
  const dispatch = useDispatch();

  const onClick = () => dispatch(exchangeActions.hideConfirmation());

  const baseSymbol = useSelector(exchangeSelectors.getBaseCurrencySymbol);
  const contraSymbol = useSelector(exchangeSelectors.getContraCurrencySymbol);
  const baseAmount = formatAmount(
    useSelector(exchangeSelectors.getConfirmationBaseAmount)
  );
  const contraAmount = formatAmount(
    useSelector(exchangeSelectors.getConfirmationContraAmount)
  );

  return (
    <>
      <div>
        {`You exchanged ${baseSymbol}${baseAmount} to ${contraSymbol}${contraAmount}`}
      </div>
      <Button onClick={onClick} data-testid="done-button">
        Done
      </Button>
    </>
  );
}

export default ExchangeForm;
