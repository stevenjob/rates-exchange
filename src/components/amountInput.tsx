import * as React from 'react';
export interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
}

function AmountInput(props: AmountInputProps) {
  return <div>{props.value}</div>;
}

export default AmountInput;
