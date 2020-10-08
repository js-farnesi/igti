// # importando com promises
import { promises as fs } from 'fs';

init();
async function init() {
  try {
    await fs.writeFile('teste.txt', 'bla bla bla');
    await fs.appendFile('teste.txt', '\nwith append file');
    const data = await fs.readFile('teste.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

// # usando promises com promisses hell
// fs.writeFile('teste.txt', 'bla bla bla')
//   .then(() => {
//     fs.appendFile('teste.txt', '\n with append file')
//       .then(() => {
//         fs.readFile('teste.txt', 'utf-8')
//           .then((resp) => {
//             console.log(resp);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       })
//       .catch.catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// # utilizando com callbacks
//import fs from 'fs';

// console.log('1');
// fs.writeFile('teste.txt', 'bla bla bla', function (error) {
//   console.log('2');
//   if (error) {
//     console.log(error);
//   } else {
//     fs.appendFile('teste.txt', ' with append', (error) => {
//       if (error) {
//         console.log(error);
//       } else {
//         fs.readFile('teste.txt', 'utf-8', (err, data) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         });
//       }
//     });
//   }
// });
// console.log('3');

// # utilizando requisição síncrona - não recomendada
// try {
//   console.log('1');
//   fs.writeFileSync('teste.txt', 'bla bla bla');
//   console.log('2');
//   const data = fs.readFileSync('teste.txt', 'utf-8');
//   console.log(data);
//   console.log('3');
// } catch (err) {
//   console.log(err);
// }
