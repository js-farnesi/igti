let allUsers = [];
let inputSearch = null;
let buttonSearch = null;
let panelUsers = null;
let panelStatistics = null;

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
    allUsers = dataJson.results.map(({ name, picture, dob, gender }) => {
      const fullname = `${name.first} ${name.last}`;
      return {
        fullname,
        fullnameLowerCase: fullname.toLowerCase(),
        profile: picture.thumbnail,
        age: dob.age,
        gender,
      };
    });
    //console.log(allUsers);
  }

  function addEvents() {
    inputSearch.addEventListener('keyup', handleKeyUp);
  }

  function handleKeyUp(event) {
    // console.log(event.target.value);
    // console.log(event.key); // pega uma tecla de cada vez, a key do enter é Enter
    const currentKey = event.key;

    if (currentKey !== 'Enter') {
      return;
    }
    const filterText = event.target.value;
    console.log(filterText);

    if (filterText.trim() !== '') {
      filterUsers(filterText);
    }
  }
  function filterUsers(filterText) {
    const filterTextLowerCase = filterText.toLowerCase();

    const filteredUsers = allUsers.filter((user) => {
      return user.fullnameLowerCase.includes(filterTextLowerCase);
    });
    console.log(filteredUsers);
  }
});
