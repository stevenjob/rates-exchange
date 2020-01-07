import * as React from 'react';
import configureStore from '../store/configureStore';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

function renderWithRedux(ui: any, initialState = {}) {
  const store = configureStore(initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}
export default renderWithRedux;
