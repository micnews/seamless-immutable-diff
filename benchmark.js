
import diff from './lib';
import Immutable from 'seamless-immutable';

const input = [];
for (let i = 0; i < 3; i++) {
  input.push({ foo: 'bar', beep: 'boop', hello: 'world'});
}
const from = Immutable(input);

const start = new Date();
let count = 0;
while (new Date() - start < 1000) {
  count++;
  let to = [{hello: 'world'}];
  diff(from, to);
}
const time = new Date() - start;
console.log(`${time / count} ms / run`);
console.log(`total time: ${time}ms`);
console.log(`iterations: ${count}`);
