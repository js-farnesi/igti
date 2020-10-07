import nome from './operacoes.js';
// na exportação nomeada só de colocar o ctrl + / entre os colchetes aparece as opções
import { divisao, resto } from './export-function.js';
// import operacoes, { soma, subtracao } from './operacoes.js';
// const operacoes = require('./operacoes.js');

// como está sendo exportado com um objeto, poderiamos dar a constante o nome que quiséssemos, exemplo op
// console.log(soma(1, 5));
// console.log(subtracao(5, 3));
//console.log(operacoes(5, 3));
console.log(nome);

console.log(divisao(5, 2));
console.log(resto(5, 2));
