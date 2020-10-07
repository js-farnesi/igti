const nome = 'Teste de exportação';

function soma(a, b) {
  return a + b;
}
function subtracao(a, b) {
  return a - b;
}

function multiplicacao(a, b) {
  return a * b;
}

export default { soma, subtracao, nome };
// export default multiplicacao;

// module.exports = { soma, subtracao, nome };
//module.exports = multiplicacao;
