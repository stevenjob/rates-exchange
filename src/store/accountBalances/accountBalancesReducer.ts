import { AccountBalanceActionTypes } from './accountBalancesActions';

export interface AccountBalancesState {
  [currency: string]: number;
}

const accountBalancesReducer = (
  state: AccountBalancesState = {},
  action: any
) => {
  if (action.type === AccountBalanceActionTypes.SET_ACCOUNT_BALANCE) {
    return {
      ...state,
      [action.currency]: action.balance
    };
  }

  return state;
};

export default accountBalancesReducer;
