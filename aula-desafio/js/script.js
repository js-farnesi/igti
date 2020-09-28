//window.addEventListener('load', start);

var inputRed = null;
var inputGreen = null;
var inputBlue = null;
var rangeRed = null;
var rangeGreen = null;
var rangeBlue = null;
var divSquare = null;

function start() {
  rangeRed = document.querySelector('#range-red');
  rangeGreen = document.querySelector('#range-green');
  rangeBlue = document.querySelector('#range-blue');

  inputRed = document.querySelector('#inputRed');
  inputGreen = document.querySelector('#inputGreen');
  inputBlue = document.querySelector('#inputBlue');

  divSquare = document.querySelector('#square');

  rangeRed.addEventListener('input', setColor);
  rangeGreen.addEventListener('input', setColor);
  rangeBlue.addEventListener('input', setColor);

  setColor();
}

function setColor() {
  var red = parseInt(rangeRed.value, 10);
  var green = parseInt(rangeGreen.value, 10);
  var blue = parseInt(rangeBlue.value, 10);

  inputRed.value = red;
  inputGreen.value = green;
  inputBlue.value = blue;

  var rgbCSS = 'rgb(' + red + ',' + green + ',' + blue + ')';

  divSquare.style.backgroundColor = rgbCSS;
}

start();
