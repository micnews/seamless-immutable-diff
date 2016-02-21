import diff from 'seamless-immutable-diff';
import Immutable from 'seamless-immutable';

const from = Immutable({ beep: { boop: true }, foo: { bar: false } });
const to = { beep: { hello: 'world' }, foo: { bar: false } };
const result = diff(from, to);

// will be true since from.foo is deep equal to to.foo
console.log(from.foo === result.foo);
// will be a seamless-immutable object { hello: 'world' }
console.log(result.beep);
