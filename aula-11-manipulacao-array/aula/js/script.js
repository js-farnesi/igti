window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();

  function doMap() {
    const nameEmailArray = people.results.map((person) => {
      return {
        name: person.name,
        email: person.email,
      };
    });
    //console.log(nameEmailArray);
    return nameEmailArray;
  }

  function doFilter() {
    const olderThan50 = people.results.filter((person) => {
      return person.dob.age > 50;
    });
    console.log(olderThan50);
  }

  function doForEach() {
    const mappedPeople = doMap();
    // console.log(mappedPeople);

    mappedPeople.forEach((person) => {
      person.name.nameSize =
        person.name.title.length +
        person.name.first.length +
        person.name.last.length;
    });
    console.log(mappedPeople);
  }

  function doReduce() {
    const totalAges = people.results.reduce((accumulator, current) => {
      return accumulator + current.dob.age;
    }, 0);
    console.log(totalAges);

    // Podemos até tirar a prova usando o for que o reduce está substituindo
    // let sumAges = 0;

    // for (let i = 0; i < people.results.length; i++) {
    //   var current = people.results[i];
    //   sumAges += current.dob.age;
    // }
    // console.log(sumAges);
  }
  function doFind() {
    const found = people.results.find((person) => {
      return person.location.state === 'Minas Gerais';
    });
    console.log(found);
  }

  function doSome() {
    const found = people.results.some((person) => {
      return person.location.state === 'Amazonas';
    });
    console.log(found);
  }

  function doEvery() {
    const every = people.results.every((person) => {
      return person.nat === 'BR';
    });
    console.log(every);
  }

  function doSort() {
    const mappedNames = people.results
      .map((person) => {
        return {
          name: person.name.first,
        };
        // para retornar strings o return não está em um objeto - return name: person.name.first;
      })
      .filter((person) => {
        return person.name.startsWith('A');
      })
      //.sort() Lembrando que o sort puro já faz a ordenação se fosse vetor de strings e não vetor de objeto
      .sort((a, b) => {
        //return a.name.localeCompare(b.name);
        // para retornar a ordenação pelo tamanho, a ordem inversa troca-se o a pelo b (b - a)
        return a.name.length - b.name.length;
      });
    console.log(mappedNames);
  }
});
