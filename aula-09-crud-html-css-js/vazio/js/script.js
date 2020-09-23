window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var inputName = null;
var currentIndex = null;
var isEditing = false;
/* Repare na ordem do inputName - estava dando erro Uncaught TypeError: inputName is null
function start() {
  preventFormSubmit();
  activateInput()

  inputName = document.querySelector('#inputName');
}*/

function start() {
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  activateInput();
  render();
}
function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}
/* O código antes de ser refatorado para dar um focus no input,
passa a monitorar a digitação quando soltar a tecla, se for enter
será feito a função inseertName passando o que foi digitado, senão ignora.
A função insertName insere o conteúdo digitado no verto globalNames
function activateInput() {
  function handleTyping(event) {
    if (event.key === 'Enter') {
      console.log('ENTER');
      var typedName = event.target.value;
      globalNames.push(typedName);
    }
  }
  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}
*/

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
  }

  function updateName(newName) {
    //console.log(newName);
    //console.log(currentIndex);
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== '';
    if (!hasText) {
      clearInput();
      return;
    }
    if (event.key === 'Enter') {
      if (isEditing) {
        //console.log('Editing...');
        updateName(event.target.value);
      } else {
        //console.log('Inserting...');
        insertName(event.target.value);
      }
      render();
      isEditing = false;
      clearInput();
    }
  }
  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}
/* Function render com strings
function render() {
  var divNames = document.querySelector('#names');
  divNames.innerHTML = '<ul><li>Nome 1</li><li>Nome 2</li></ul>';
}

Se fossemos fazer na mão
function render() {
  var divNames = document.querySelector('#names');

  var ul = document.createElement('ul');
  var li1 = document.createElement('li');
  var li2 = document.createElement('li');
  li1.textContent = 'Primeiro';
  li2.textContent = 'Segundo';
  ul.appendChild(li1);
  ul.appendChild(li2);
  divNames.appendChild(ul);
}*/
function render() {
  function createDeleteButton(index) {
    function deleteName() {
      console.log(index);
      globalNames.splice(index, 1);
      render();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
