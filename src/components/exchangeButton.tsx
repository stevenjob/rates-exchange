import * as React from 'react';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as exchangeSelectors from '../store/exchange/exchangeSelectors';
import * as exchangeActions from '../store/exchange/exchangeActions';

function ExchangeButton() {
  const dispatch = useDispatch();
  const onClick = () => dispatch(exchangeActions.onExchangeButtonPress());

  const disabled = !useSelector(exchangeSelectors.isExchangeEnabled);

  return (
    <Button
      color="primary"
      block
      onClick={onClick}
      disabled={disabled}
      data-testid="exchange-button"
    >
      Exchange
    </Button>
  );
}

export default ExchangeButton;
