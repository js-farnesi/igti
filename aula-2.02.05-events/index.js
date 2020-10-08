// como fizemos o export defaul não precisamos colocar o nome exato
import ev from './events.js';

ev.on('testEvent', () => {
  console.log('ouviu também mesmo em outro arquivo');
});

// a ordem do ev.on e ev.emit faz completa diferença
ev.emit('testEvent', 'bla bla bla');
