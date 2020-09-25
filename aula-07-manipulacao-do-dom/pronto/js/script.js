console.log('Oi');

var title = document.querySelector('h1');
title.textContent = 'Manipulando o HTML';

var city = document.querySelector('#city');
city.textContent = 'São Paulo, SP';

var personal = document.querySelector('.data');
personal.textContent = 'Mineiro, 38';

/*
var DataArray = document.querySelectorAll('.data');
// Armazena na própria variável o retorno do Array.from - mutabilidade (variável mutável)
DataArray = Array.from(DataArray);


var data = Array.from(document.querySelectorAll('.data'));
for (var i = 0; i < data.length; i++) {
  var currentElement = data[i];
  currentElement.style.color = 'green';
}
*/

var data = Array.from(document.querySelectorAll('.data'));
for (var i = 0; i < data.length; i++) {
  var elementoAtual = data[i];
  elementoAtual.classList.add('emphasis');
}
