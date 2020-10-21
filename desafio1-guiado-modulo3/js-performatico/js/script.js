window.addEventListener('load', start);

const clickArray = [];

function start() {
  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
}

function handleButtonClick() {
  const item = getNewTimestamp();
  clickArray.push(item);
  // não esquecer de renderizar o item, senão renderiza apenas as lis
  render(item);
}

function render(item) {
  const ul = document.querySelector('#data');

  const li = document.createElement('li');
  li.textContent = item;

  ul.appendChild(li);
}
