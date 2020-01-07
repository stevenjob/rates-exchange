import * as React from 'react';
import finput from 'finput';

export interface AmountInputProps {
  value: number;
  onChange?: (value: number) => void;
  onBlur?: (value: number) => void;
}

interface State {
  externalUpdate: boolean;
  initialUpdate: boolean;
}

interface DefaultProps {
  onChange: (value: number) => void;
  onBlur: (value: number) => void;
}

const options = {
  range: 'POSITIVE'
};

class AmountInput extends React.Component<
  AmountInputProps & DefaultProps,
  State
> {
  static defaultProps: { onChange: () => void; onBlur: () => void };
  finput: any;
  input: any;

  constructor(props: Readonly<AmountInputProps & DefaultProps>) {
    super(props);
    this.state = {
      externalUpdate: false,
      initialUpdate: !!props.value
    };
  }

  componentWillReceiveProps(nextProps: { value: number }) {
    const { value } = nextProps;

    this.setState({
      externalUpdate: value !== this.finput.rawValue
    });
  }

  render() {
    const { onBlur, onChange, value, ...others } = this.props;
    const { externalUpdate } = this.state;

    return (
      <input
        ref={input => {
          this.input = input as any;
          if (this.input && externalUpdate) {
            this.finput.setRawValue(value);
          }
        }}
        onKeyDown={e => {
          onChange(this.finput.rawValue);
        }}
        onBlur={e => {
          onBlur(this.finput.rawValue);
        }}
        {...others}
      />
    );
  }

  componentDidMount() {
    const { value } = this.props;
    const { initialUpdate } = this.state;

    this.finput = (finput as any)(this.input, options);
    if (initialUpdate) {
      this.finput.setRawValue(value);
    }
  }
}

AmountInput.defaultProps = {
  onChange: () => {},
  onBlur: () => {}
};

export default AmountInput;
