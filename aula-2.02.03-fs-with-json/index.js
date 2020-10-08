import { promises as fs } from 'fs';

//init();
writeReadJson();

// utilizando com async/await para escrivar arquivo em txt
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

// utilizando para gravar arquivo JSON
async function writeReadJson() {
  // escrito com valores iniciais
  const arrayCarros = ['Gol', 'Palio', 'Uno'];
  const carros = {
    carros: arrayCarros,
  };
  try {
    await fs.writeFile('teste.json', JSON.stringify(carros));
    // const data = await fs.readFile('teste.json', 'utf-8');

    // fez a leitura do conteúdo atual
    const data = JSON.parse(await fs.readFile('teste.json'));
    // ao usar o utf-8 até retorna o array de carros, mas como string não conseguimos adicionar um novo carro
    //console.log(JSON.parse(data));

    //modificamos o conteúdo
    data.carros.push('Fiesta');
    //console.log(data);

    // sobrescrevemos o arquivo com o conteúdo modificado (não podemos usar appendFile)
    await fs.writeFile('teste.json', JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}
