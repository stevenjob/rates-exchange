import * as React from 'react';
import { Button } from 'reactstrap';

export interface SwitchCurrenciesProps {
  onClick: () => void;
}

function SwitchCurrencies(props: SwitchCurrenciesProps) {
  return (
    <Button>
      <i className="material-icons">swap_vert</i>
    </Button>
  );
}

export default SwitchCurrencies;
