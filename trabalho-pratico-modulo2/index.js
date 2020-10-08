import { promises as fs } from 'fs';
import { inherits } from 'util';

init();

async function init() {
  await createFile();
  //console.log(await countCitiesByUF('CE'));
  await getUFWithMoreorLessCities(true);
  await getUFWithMoreorLessCities(false);
}

// antes de organizar na função init
//createFile();
// console.log(getCitiesCount('MG'));
// retorno Promise { <pending> } sem colocar uma promisse no getCitiesCount - com await para não encadear promisse dentro de promisse

//fs.readFile('./files/Estados.json').then((data) => {
// console.log(JSON.parse(data));
async function createFile() {
  // para não ficar com a promise pending
  //getCitiesCount('MG').then((resp) => console.log(resp));
  await countCitiesByUF('MG');

  let data = await fs.readFile('./files/Estados.json');
  const states = JSON.parse(data);

  data = await fs.readFile('./files/Cidades.json');
  const cities = JSON.parse(data);

  for (let state of states) {
    //states.forEach(async function (state) {
    const stateCities = cities.filter((city) => city.Estado === state.ID);
    await fs.writeFile(
      `./states/${state.Sigla}.json`,
      JSON.stringify(stateCities)
    );

    //console.log(states);
  }
  //});
}

async function countCitiesByUF(uf) {
  const data = await fs.readFile(`./states/${uf}.json`);
  const cities = JSON.parse(data);
  return cities.length;
}

// Lemos diretamente dos JSON se fosse API não há garantir dos métodos vierem do mesmo lugar
async function getUFWithMoreorLessCities(decision) {
  const states = JSON.parse(await fs.readFile('./files/Estados.json'));
  const stateList = [];

  for (let state of states) {
    const count = await countCitiesByUF(state.Sigla);
    // como o propriedade JSON tem o mesmo nome ao settar não precisa repetir chave : valor
    stateList.push({ uf: state.Sigla, count });
  }
  stateList.sort((a, b) => {
    //return a.count - b.count;
    return b.count - a.count;
  });

  const result = [];

  if (decision) {
    stateList
      .slice(0, 5)
      .forEach((item) => result.push(`${item.uf} - ${item.count}`));
  } else {
    stateList
      .slice(-5)
      .forEach((item) => result.push(`${item.uf} - ${item.count}`));
  }
  // console.log(stateList);
  console.log(result);
}
