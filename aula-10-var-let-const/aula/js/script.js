'use strict'; //Javascript acusa mais erros

// var escopo abrangente e let escopo reduzido
function withVar() {
  for (var i = 0; i <= 10; i++) {
    console.log('var ' + i);
  }
  i = 20;
  console.log(i);
}

function withLet() {
  for (let i = 0; i <= 10; i++) {
    console.log('let ' + i);
  }
  //i = 20;
  //console.log(i);
  // retorna erro: ReferenceError: i is not defined
}

withVar();
withLet();

// Const não pode ter valor reatribuido

const a = 10;
//a = 20;
// Retorna erro: TypeError: Assignment to constant variable.

const b = [];
//b = 1;
// Retorna erro: TypeError: Assignment to constant variable.
b.push(1);
console.log(b);
// inseriu o um no array [1], pois foi mudado a referência

function sum(a, b) {
  return a + b;
}

// função anônima
const sumConst = function (a, b) {
  return a + b;
};

// função anônima
const sumArrow = (a, b) => {
  return a + b;
};

// arrow funcion reduzida quando temos apenas um bloco não precisa do return e nem chave
const sumShortArrow = (a, b) => a + b;

console.log(sum(2, 3));
console.log(sumConst(2, 3));
console.log(sumArrow(2, 3));
console.log(sumShortArrow(2, 3));

const name = 'Rafael';
const surname = 'Gomide';
const nameWithConcat = 'Meu nome é ' + name + ' ' + surname;
const nameTemplateLiterals = `Meu nome é ${name} ${surname}`;

console.log(nameWithConcat);
console.log(nameTemplateLiterals);

// recomenda-se que o parâmetro padrão fique no final
const defaultparameters = (a, b = 10) => a + b;
console.log(defaultparameters(1));
