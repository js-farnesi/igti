import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(3000, () => {
  console.log('API Started!');
});

// Instalamos o nodemon para facilitar continuar a editar o código e o Insomnia para testar as solicitações. Criamos uma pasta no Insomnia e colocamos para testar os métodos get e post configurados para localhost

// Adicionamos o método post

app.post('/', (req, res) => {
  res.send('Hello World with POST');
});

// Podemos cololocar uma soma e pegar o resultado, colocamos um break point em const a para testar
app.post('/', (req, res) => {
  const a = 3;
  const b = 5;
  const resultado = a + b;
  res.send('Resultado: ' + resultado);
});

// Podemos até criar uma função de soma para testar com uma função colocando o break point na const resultado para testar o step over e step into (retirando o break point de resultado) o processo de debug vai passar por dentro da função e com o step into vai continuar dentro dela
app.post('/', (req, res) => {
  const a = 3;
  const b = 5;
  const resultado = soma(a, b);
  res.send('Resultado: ' + resultado);
});

function soma(a, b) {
  const resultado = a + b;
  return resultado;
}

// Verificarmos que com a rota, definimos uma URL, que assim que assim que chega uma requisição na URL, vamos ter algum código que será executado respondendo

// Agora vamos fazer outro arquivo e como estaremos sempre alterando já vamos rodar com o .
// Para cada novo arquivo que fizermos, temos que usar o npm init -y, npm install express, altera o package.json com o "type":"module", rodar com o nodemon (se não tiver instalado global, devemos instalar)
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.listen(3000, () => {
  console.log('API Started!');
});

// Agora vamos criar um método all que todos os métodos recebidos no req serão exibidos
app.all('/testAll', (req, res) => {
  res.send(req.method);
});
// Será exibido o método que escolhermos no Insomnia (PUT,GET,POST,DELETE)

// Caracteres Especiais

// Podemos definir que se o último caracter for digitado ou não ainda entra na rota
app.get('/teste?', (req, res) => {
  res.send('/teste?');
});
// Com uma rota que definimos no express estamos respondendo em dois endereços (/teste e /test). Sendo o e opcional.
// O req ficará azul, pois estaremos definindo, mas não usando, então podemos colocar _req ou apenas o _ para fique normal na IDE que estivermos editando o código

// Se quisermos repetir o último caractere usamos o +, assim a rota pode ter de 2 à infinitos letras z
app.get('/buzz+', (req, res) => {
  res.send('Buzz com 2 ou infititos ZZZZ');
});
// Se tiver apenas um z, irá dar erro 404

// Para ter um caractere coringa usamos o *, assim na rota de exemplo podemos dolocar o que quiser entre o one e Blue
app.get('/one*Blue', (req, res) => {
  res.send('one e um monte de coisas antes do Blue');
});
// Para pegarmos o path use o req.path
res.send(req.path);

// Para uma sequencia seja opcional ou não usamos o () delimitando o conteúdo que deve ser opcional e o ? para informar que é opcional
app.post('test(ing)?', (req, res) => {
  res.send('Aceita test ou testing');
});
// Se trocarmos por + ao final do parênteses test(ing)+, aceitaria apenas testing ou variações que tenham mais ing (testinging)

// Podemos usar expressões regulares entre barras (/.*Red$/)
app.get(/.*Red$/, (req, res) => {
  res.send(req.path);
});
// Aceitará tudo que tiver qualquer coisa e que termine com Red

// Parâmetros na rota

// Vamos experimentar usar parâmetro no body, será um json no body, mas para que funcione e não retorne undefined precisamos avisar ao express que queremos pegar json no body, para isso configuramos app.use(express.json()). Assim pegamos parâmetros no body da requisição

// Geralmente pegamos parâmetro usando o body
app.post('/', (req, res) => {
  console.log(req.body);
  res.sent('O conteudo do body');
});

// Normalmente pegamos parâmetros na ULR (diretamente na rota)
app.get('/testParam/:id/:a?', (req, res) => {
  res.send(req.params.id + ' ' + req.params.a);
});
// No insomnia passamos na URL testParam/10/2 e teremos como resposta 10 2, mas se não passarmos o segundo parâmetro não tem problema por causa do ?. Ou seja, o segundo parâmetro é opcional, retornando undefined no segundo parâmetro, mas se não passarmos o primeiro parâmetro retornará o erro 404
