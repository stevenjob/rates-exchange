const formatAmount = (balance: number) => {
  return balance.toLocaleString('en-US', { minimumFractionDigits: 2 });
};

export default formatAmount;
