console.log('JavaScript em funcionamento!');

// Comparando 2 números com if/else
var a = 5;
var b = 6;

if (a > b) {
  console.log(a + ' é maior que ' + b);
} else {
  if (a < b) {
    console.log(a + ' é menor que ' + b);
  } else {
    console.log(a + ' é igual a ' + b);
  }
}

// Dia da semana por extenso
var dia = 1;
var r = '';

// prettier-ignore
switch (dia) {
  case 1:
    r = 'Domingo';
    break;
  case 2:
    r = 'Segunda';
    break;
  case 3:
    r = 'Terça';
    break;
  case 4:
    r = 'Quarta';
    break;
  case 5:
    r = 'Quinta';
    break;
  case 6:
    r = 'Sexta';
    break;
  case 7:
    r = 'Sábado';
    break;

  default:
    r = 'Dia inválido';
}
console.log(r);

// Operador ternário

var x = 5;
var y = 6;

var resposta = a > b ? 'maior' : a < b ? 'menor' : 'igual';
console.log(resposta);

var diasemana =
  dia === 1
    ? 'Domingo'
    : dia === 2
    ? 'Segunda'
    : dia === 3
    ? 'Terça'
    : dia === 4
    ? 'Quarta'
    : dia === 5
    ? 'Quinta'
    : dia === 6
    ? 'Sexta'
    : dia === 7
    ? 'Sábado'
    : 'Dia inválido';

console.log(diasemana);
