import * as React from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  onFocus: () => void;
}

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2,
  integerLimit: 7,
  allowNegative: false,
  allowLeadingZeroes: false
};

const createAmountInputMask = (maskOptions: any) => {
  const decimalsRegex = /\.([0-9]{1,2})/;
  const numberMask = createNumberMask({
    includeThousandsSeparator: true,
    allowDecimal: true,
    requireDecimal: true,
    allowLeadingZeroes: false,
    ...maskOptions
  });

  return (rawValue: any) => {
    const mask = numberMask(rawValue);
    const result = decimalsRegex.exec(rawValue);

    if (result && result[1].length < 2) {
      mask.push('0');
    } else if (!result) {
      mask.push('0');
      mask.push('0');
    }

    return mask;
  };
};

const AmountInput = (props: AmountInputProps) => {
  const currencyMask = createAmountInputMask({
    ...defaultMaskOptions
  });

  const inputEl = React.useRef(null);

  return (
    <MaskedInput
      mask={currencyMask}
      {...props}
      ref={inputEl}
      onClick={() => {
        if (props.value === 0 && inputEl) {
          (inputEl.current as any).inputElement.select();
        }
      }}
      onChange={e => {
        const newValue = Number(
          e.target.value.replace(/,/g, '').replace(/_/g, '')
        );
        if (!isNaN(newValue)) {
          props.onChange(newValue);
        }
      }}
      render={(ref, renderProps) => (
        <Input
          data-testid="amount-input"
          inputMode="numeric"
          innerRef={ref}
          {...renderProps}
        />
      )}
    />
  );
};

const StyledAmountInput = styled(AmountInput)`
  text-align: right;
`;

export default StyledAmountInput;
