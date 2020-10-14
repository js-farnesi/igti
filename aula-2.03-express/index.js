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

// Parametros via query
// Para passar parâmetros via query string que basicamente são chaves valores (chave=valor) que começam a partir da ?, concatenados pelo &. Passando via query a rota vai receber tudo isso via JSON, assim a rota fica dinâmica, podendo acrescentar ou remover parâmetros.
// Vamos depois ver estes parâmetros usando o req.query
// Na hora que estivermos fazendo APIs de fato, colocaremos regras de negócio dentro das rotas
app.get('testQuery?nome=joao&email=xyz&cpf=01923432423', (req, res) => {
  res.send(req.query);
});

// Pegamos o resultado da query em JSON usando o req.query
// {
// 	nome=joao
// 	email=xyz
// 	cpf=01923432423
// }
// Quando não preenchemos parâmetros via query retorna um array vazio

// É muito usado quando fazemos filtros em consultas onde os usuário podem passar N filtros (data inicial/data final), para não ter que ficar definindo um rota para cada tipo de consulta, passamos em uma query string

// Se usarmos um terceiro parâmetro next (depois do req / res) que permite que mais de uma função seja executada por requisição. Podemos realizar a execução da primeira função e com o next chamar a próxima execução da fila, não precisando colocar todo o código que vai ser processado, podendo quebrar em várias funções ou até reaproveitar funções.

//  Usando next
// O parâmetro next tem que ficar na 3ª posição
// Entre a primeira callback e a segunda, colocamos o parâmetro next para que não fique preso na primeira callback. Tiremos o fluxo de execução da primeira função para a segunda função.
app.get(
  '/testMultipleHandlers',
  (req, res, next) => {
    console.log('Callback 1');
    next();
  },
  (req, res) => {
    console.log('Callback 2');
  }
);
// Ao executar o código do jeito que está ficará executando e a requisição não termina, apesar de imprimir o resultado, senão a requisição vai ficar pendente eternamente. Então precisamos encerrar a requisição para dar uma resposta para o usuário. Podemos passar o next para várias funções, mas na última tem que finalizar a execução, seja retornando uma resposta para o o usuário ou se não formos retornar nada devemos fazer um res.end(), isso finalizará a execução sem respostas (No body returned for response).

// Next com arrays
// Criamos com variáveis e funções para testar e no final definimos uma rota do tipo get com a rota /testMultpleHandlersArray com um array e dentro do array todas as callbacks que serão executadas
const callback1 = (req, res, next) => {
  console.log('Callback 1');
  next();
};

function callback2(req, _res, next) {
  console.log('Callback 2');
  next();
}

const callback3 = (req, res) => {
  console.log('Callback 3');
  res.end();
};
app.get('/testMultpleHandlersArray', [callback1, callback2, callback3]);
// Foi retornado as 3 callbacks
// Callback1
// Callback2
// Callback3
// Mas se colocassemos o res.end(), na segunda callback, seria retornado apenas a primeira e a segunda, pois apesar da callback3 estar configurada, a requisição não foi para a callback3

// Com o route podemos agrupar vários verbos HTTP em um única rota
// Diferente que all (o all pega todas as requisições e joga para a mesma callback) que vai receber todas as requisições que chegarem, independente do verbo HTTP, no route definimos quais os verbos que queremos que entre e colocamos um callback para cada verbo que entrar.
app
  .route('/testRoute')
  .get((req, res) => {
    res.send('/testRoute GET');
  })
  .post((req, res) => {
    res.send('/testRoute POST');
  })
  .delete((req, res) => {
    res.send('/testRoute DELETE');
  });
// Como não definimos nada para o PUT, ao executá-lo no Insomnia é retornado o erro 404
