console.log('Por convenção class escreve com UpperCamelCase');

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} falando...`);
  }
}

class Dog extends Animal {
  constructor(name, type) {
    super(name);

    this.type = type;
  }

  speak() {
    console.log(`${this.name} (${this.type}) latindo...`);
  }
}

class Cat extends Animal {
  constructor(name, type) {
    super(name);

    this.type = type;
  }

  speak() {
    console.log(`${this.name} (${this.type}) miando...`);
  }
}

const animal = new Animal('Totó');
const dog = new Dog('Jack', 'Poodle');
const cat = new Cat('Hans Solo', 'Frajola');
animal.speak();
dog.speak();
cat.speak();
