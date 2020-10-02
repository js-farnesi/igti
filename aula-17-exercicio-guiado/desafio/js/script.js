// Estado da aplicação state
let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countContries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;
window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  //prettier-ignore
  totalPopulationFavorites = 
  document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});
//  sem async / await
//function fetchCountries() {
// fetch('https://restcountries.eu/rest/v2/all')
//   .then((res) => res.json())
//   .then((json) => {
//     allCountries = json;
//     console.log(allCountries);
//   });

// usando async / await
// async function fetchCountries() {
//   const res = await fetch('https://restcountries.eu/rest/v2/all');
//   const json = await res.json();
//   allCountries = json;
//   console.log(allCountries);
// }

// não queremos o array completo, apenas id name population flag, usamos destructuring e não repetimos campo (flag: flag)
async function fetchCountries() {
  const res = await fetch('https://restccountries.eu/rest/v2/all');
  const json = await res.json();
  allCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;

    return {
      id: numericCode,
      name: translations.br,
      population,
      flag,
    };
  });

  // teste do favoriteCountries usando todos os países
  // favoriteCountries = allCountries;

  render();
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = '<div>';

  allCountries.forEach((country) => {
    const { name, flag, id, population } = country;

    const countryHTML = `
      <div class="country">
        <div>
          <a id="${id}" class="waves-effect waves-light btn">+</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${Intl.NumberFormat('pt-BR').format(population)}</li>
          </ul>
        </div>
      </div>
      `;

    countriesHTML += countryHTML;
  });
  countriesHTML += '</div>';

  tabCountries.innerHTML = countriesHTML;
}

function renderFavorites() {
  let favoritesHTML = '<div>';

  favoriteCountries.forEach((country) => {
    const { name, flag, id, population } = country;
    const favoriteHTML = `
      <div class="country">
        <div>
          <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${Intl.NumberFormat('pt-BR').format(population)}</li>
          </ul>
        </div>
      </div>
      `;

    favoritesHTML += favoriteHTML;
  });

  favoritesHTML += '</div>';

  tabFavorites.innerHTML = favoritesHTML;
}

function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;

  const totalPopulation = allCountries.reduce((accumulatior, current) => {
    return accumulatior + current.population;
  }, 0);

  //prettier-ignore
  totalPopulationList.textContent = 
  Intl.NumberFormat('pt-BR')
  .format(totalPopulation);

  const totalFavorites = favoriteCountries.reduce((accumulatior, current) => {
    return accumulatior + current.population;
  }, 0);

  //prettier-ignore
  totalPopulationFavorites.textContent = 
  Intl.NumberFormat('pt-BR')
  .format(totalFavorites);
}

function handleCountryButtons() {
  // se fossemos buscar pela classe btn no documento inteiro usariamos document.querySelectorAll('.btn')
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });

  function addToFavorites(id) {
    const countryToAdd = allCountries.find((country) => country.id === id);
    favoriteCountries = [...favoriteCountries, countryToAdd];

    favoriteCountries.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    allCountries = allCountries.filter((country) => country.id !== id);

    // se não colocamos o render conseguimos o elemento não sai da tela e conseguimos clicar duas vezes a a contagem não muda
    // console.log(allCountries.length);
    render();
  }

  function removeFromFavorites(id) {
    const countryToRemove = favoriteCountries.find(
      (country) => country.id === id
    );
    allCountries = [...allCountries, countryToRemove];

    allCountries.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    favoriteCountries = favoriteCountries.filter(
      (country) => country.id !== id
    );

    render();
  }
}
