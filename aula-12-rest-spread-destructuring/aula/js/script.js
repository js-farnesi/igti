window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );
  const marriedWoMen = people.results.filter(
    (person) => person.name.title === 'Ms'
  );

  const marriedPeople = [
    ...marriedMen,
    ...marriedWoMen,
    { msg: 'Apenas teste' },
  ];

  console.log(marriedMen);
  console.log(marriedWoMen);
  console.log(marriedPeople);
}

function doRest() {
  console.log(infiniteSum(1, 2, 3));
}

function infiniteSum(...numbers) {
  //console.log(numbers);   //[1, 2, 3]
  return numbers.reduce((acc, curr) => acc + curr, 0); //como é um vetor de numero o current é o próprio número, não sendo necessario desestruturar o objeto
}

function doDestructuring() {
  const first = people.results[0];

  // sem destructuring
  //const username = first.login.username;
  //const password = first.login.password;

  // com destructuring
  const { username, password } = first.login;
  console.log(username);
  console.log(password);
}
