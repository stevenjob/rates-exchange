import * as React from 'react';
export interface CurrencySelectorProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function CurrencySelector(props: CurrencySelectorProps) {
  // prop should be isBase?

  //   const selectedCurrency; // currently selected currency;
  //   const currencies; // all currencies avalable apart from the other currency

  // use dropdown component
  return <div>{props.value}</div>;
}

export default CurrencySelector;
