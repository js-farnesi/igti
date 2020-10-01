window.addEventListener('load', () => {
  const timer = document.querySelector('#timer');
  //lembrando que o setInterval temos que guardar em uma variável para cancelar depois
  let count = 0;

  const interval = setInterval(() => {
    timer.textContent = ++count;

    if (count === 10) {
      this.clearInterval(interval);
      // não chega a exibir o 10,
      return;
    }
    if (count % 5 === 0) {
      setTimeout(() => {
        timer.textContent = count + ',5';
      }, 500);
    }
  }, 1000);
});
