const formatter = Intl.NumberFormat('pt-BR');

const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatNumber(value) {
  return formatter.format(value);
}

function formatMoney(value) {
  return moneyFormatter.format(value);
}
function formatMoneyPositiveNegative(value) {
  const money = moneyFormatter.format(value);

  if (value >= 0) {
    return `+${money}`;
  }
  return money;
}
function formatPercentage(value) {
  const stringValue = value.toFixed(2);

  return stringValue.replace('.', ',') + ' %';
}

export {
  formatNumber,
  formatPercentage,
  formatMoney,
  formatMoneyPositiveNegative,
};
