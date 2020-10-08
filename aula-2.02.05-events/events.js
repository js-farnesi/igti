import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('testEvent', (obj) => {
  console.log(obj);
});

// eventEmitter.on('testEvent', (obj) => {
//   console.log(obj + ' ouvindo');
// });

// eventEmitter.emit('testEvent', 'abc');
export default eventEmitter;
