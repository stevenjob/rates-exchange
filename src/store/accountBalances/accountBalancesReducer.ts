export interface AccountBalancesState {
  [currency: string]: number;
}

const accountBalancesReducer = (
  state: AccountBalancesState = {},
  action: any
) => {
  return state;
};

export default accountBalancesReducer;
