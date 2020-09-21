function sum(a, b) {
  return a + b;
}
console.log(sum(1, 2));

function compareNumbers(a, b) {
  return a > b ? 'maior' : a < b ? 'menor' : 'igual';
}
console.log(compareNumbers(3, 2));

// Funções comparadores retorna numero negativo se menor, zero se igual e numero positivo se maior
function compareWithNumbers(a, b) {
  //return a > b ? 1 : a < b ? -1 : 0;
  return a - b;
}
console.log(compareWithNumbers(1, 2));
console.log(compareWithNumbers(1, 1));
console.log(compareWithNumbers(2, 1));

function superSum(from, upTo) {
  var sum = 0;

  for (var i = from; i <= upTo; i++) {
    sum += i;
  }
  return sum;
}

console.log(superSum(1, 10));
console.log(superSum(9, 100));
console.log(superSum(200, 1000));
