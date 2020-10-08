let allUsers = [];
let inputSearch = null;
let buttonSearch = null;
let panelUsers = null;
let panelStatistics = null;
const formatter = Intl.NumberFormat('pt-BR');

window.addEventListener('load', async () => {
  mapElement();
  await getData();
  preventFormSubmit();
  //preventDefault();
  // retirando o async antes da função anônima e o await no getData ao executar o console o array estará vazio
  // console.log(allUsers);
  addEvents();

  function mapElement() {
    inputSearch = document.querySelector('#inputSearch');
    buttonSearch = document.querySelector('#buttonSearch');
    panelUsers = document.querySelector('#panelUsers');
    panelStatistics = document.querySelector('#panelStatistics');

    // inputSearch.value = 'Ola';
    // buttonSearch.textContent = 'Button New Name';
    // panelUsers.innerHTML = '<p>AllUsers</p>';
    // panelStatistics.innerHTML = '<p>AllStatistics</p>';
  }

  function preventFormSubmit() {
    function handleSubmit(event) {
      event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
  }

  // Outra forma de fazer o preventDefault ainda precisa de duas funções, passando o evento na segunda função
  // function preventDefault() {
  //   let form = document.querySelector('form');
  //   form.addEventListener('submit', handleSubmit);
  //   function handleSubmit(event) {
  //     event.preventDefault();
  //   }
  // }

  async function getData() {
    const users = await fetch(
      'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
    );
    let dataJson = await users.json();
    // allUsers = dataJson.results.map((user) => {
    // let { name, picture, dob, gender } = user;
    // ou se forma mais simples
    allUsers = dataJson.results
      .map(({ name, picture, dob, gender }) => {
        const fullname = `${name.first} ${name.last}`;
        return {
          fullname,
          fullnameLowerCase: fullname.toLowerCase(),
          profile: picture.thumbnail,
          age: dob.age,
          gender,
        };
      })
      .sort((a, b) => {
        return a.fullname.localeCompare(b.fullname);
      });
    //console.log(allUsers);
  }

  function addEvents() {
    inputSearch.addEventListener('keyup', handleKeyUp);
    buttonSearch.addEventListener('click', handleKeyUp(inputSearch.value));
  }

  function handleKeyUp(event) {
    // console.log(event.target.value);
    // console.log(event.key); // pega uma tecla de cada vez, a key do enter é Enter
    const currentKey = event.key;

    if (currentKey !== 'Enter') {
      return;
    }
    const filterText = event.target.value;
    //console.log(filterText);

    if (filterText.trim() !== '') {
      filterUsers(filterText);
    }
  }

  function filterUsers(filterText) {
    const filterTextLowerCase = filterText.toLowerCase();

    const filteredUsers = allUsers.filter((user) => {
      return user.fullnameLowerCase.includes(filterTextLowerCase);
    });
    //console.log(filteredUsers);
    renderUser(filteredUsers);
    renderStatistics(filteredUsers);
  }

  function renderUser(allUsers) {
    panelUsers.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = `${allUsers.length} usuário(s) encontrado(s)`;

    const ul = document.createElement('ul');

    allUsers.forEach((user) => {
      const li = document.createElement('li');
      li.classList.add('flex-row');
      //li.textContent = user.fullname;
      //console.log(user.fullname);
      //li.textContent = `${user.fullname} , ${user.age} anos`;

      const img = `<img src="${user.profile}" class="avatar" alt="${user.fullname}" />`;
      const userData = `<span>${user.fullname} , ${user.age} anos</span>`;

      li.innerHTML = `${img} ${userData}`;

      ul.appendChild(li);
    });

    panelUsers.appendChild(h2);
    panelUsers.appendChild(ul);

    // quantidade de elementos que atendem ao critério encontrado
  }

  function renderStatistics(allUsers) {
    const countMale = allUsers.filter((user) => user.gender === 'male').length;
    const countFemale = allUsers.filter((user) => user.gender === 'female')
      .length;
    const sumAges = allUsers.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0);
    //console.log(allUsers);
    const averageAge = sumAges / allUsers.length || 0;

    panelStatistics.innerHTML = `
    <h2>Estatísticas<h2>
    <ul>
      <li>Sexo Masculino: <span>${countMale} </span></li>
      <li>Sexo Feminino: <span>${countFemale} </span></li>
      <li>Soma das idades: <span>${formatNumber(sumAges)} </span></li>
      <li>Média das idades: <span>${formatAverage(averageAge)} </span></li>
    </ul>
    `;
  }
  function formatNumber(number) {
    return formatter.format(number);
  }
  function formatAverage(number) {
    return number.toFixed(2).replace('.', ',');
  }
});
