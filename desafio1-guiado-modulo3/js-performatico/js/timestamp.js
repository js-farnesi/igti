// Para formatar padrão exibindo com 2 caracteres, sendo o padrão 0
function leftPad(value, count = 2, char = '0') {
  const stringValue = value.toString();
  let newValue = stringValue;

  if (stringValue.length < count) {
    for (let i = 0; i < count - stringValue.length; i++) {
      newValue = char + stringValue;
    }
  }

  return newValue;
}

function getNewTimestamp() {
  // console.log(leftPad('1'));
  // console.log(leftPad('1', 3)); //count com 3 caracteres;
  // console.log(leftPad('1', 3, '_')); //count com 3 caracteres e caractere padrão underscore
  // console.log(leftPad('11'));
  // console.log(leftPad('111'));

  // return 'timestamp';
  // Poderiamos usar o Intl, mas não serve, pois precisamos de milisegundos

  const now = new Date();
  let result = '';

  result += leftPad(now.getDate());
  result += ' / ';
  result += leftPad(now.getMonth());
  result += ' / ';
  result += leftPad(now.getFullYear());
  result += ' - ';
  result += leftPad(now.getHours());
  result += ' : ';
  result += leftPad(now.getMinutes());
  result += ' : ';
  result += leftPad(now.getSeconds());
  result += ' . ';
  result += leftPad(now.getMilliseconds(), 3);

  return result;
}
