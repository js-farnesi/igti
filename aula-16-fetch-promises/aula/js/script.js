//  dados retornam em formato de promise resolvido
// const rrgomide = fetch('https://api.github.com/users/rrgomide');
// console.log(rrgomide);

// console.log('Antes da promise');
// const rrgomide = fetch('https://api.github.com/users/rrgomide').then((res) => {
//   console.log('Promise resolvida');
// });
// console.log('Depois da promise');

// primeiro parâmetro booleano resource (res) - no body readableStream que não lemos diretamente
// const rrgomide = fetch('https://api.github.com/users/rrgomide').then((res) => {
//   res.json().then((data) => {
//     console.log(data);
//   });
// });

// window.addEventListener('load', () => {
//   fetch('https://api.github.com/users/rrgomide').then((res) => {
//     res.json().then((data) => {
//       showData(data);
//     });
//   });
// });

// function showData(data) {
//   const user = document.querySelector('#user');
//   user.textContent = data.login + ' ' + data.name;
// }

//Vamos trabalhar com erro
window.addEventListener('load', () => {
  fetch('https://api.github.com/users/rrgomide')
    .then((res) => {
      res.json().then((data) => {
        showData(data);
      });
    })
    .catch((error) => {
      console.log('Erro na requisição');
    });
  //console.log(divisionPromise(5, 1));
  // // deveria dar erro, mas retornou infinito quando testamos divisionPromise() apenas com return a/b
  //console.log(divisionPromise(5, 0));
  // Agora que temos uma promise temos que usar a sintaxe de promise
  divisionPromise(12, 6).then((result) => {
    console.log(result);
  });
  divisionPromise(12, 0)
    .then((result) => {
      console.log(result);
    })
    .catch((errorMessage) => {
      console.log(`Falha na divisão:
      ${errorMessage}`);
    });

  executeDivisionPromisse();
  executeDivisionPromiseAsyncAwait();
  dofetch();
  doFetchAsync();
});

function showData(data) {
  const user = document.querySelector('#user');
  user.textContent = data.login + ' ' + data.name;
}

function divisionPromise(a, b) {
  // return a / b;
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possível dividir por zero');
    }
    resolve(a / b);
  });
}

function executeDivisionPromisse() {
  divisionPromise(12, 0)
    .then((result) => {
      console.log(result);
    })
    .catch((errorMessage) => {
      console.log(`Falha na divisão:
      ${errorMessage}`);
    });
}

async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division);
}

function dofetch() {
  fetch('https://api.github.com/users/rrgomide')
    .then((res) => {
      res.json().then((data) => {
        showData(data);
      });
    })
    .catch((error) => {
      console.log('Erro na requisição');
    });
}

async function doFetchAsync() {
  const res = await fetch('https://api.github.com/users/rrgomide');
  const json = await res.json();
  console.log(json);
}
