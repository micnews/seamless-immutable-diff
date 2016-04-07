import test from 'ava';
import 'babel-core/register';
import diff from './lib';
import Immutable from 'seamless-immutable';

test('input must be seamless-immutable', t => {
  t.throws(() => {
    diff([], []);
  });
});

test('no difference returns same seamless-immutable structure', t => {
  const from = Immutable({foo: {bar: true}});
  const to = {foo: {bar: true}};
  const expected = from;
  const actual = diff(from, to);
  t.is(actual, expected);
});

test('works when adding properties', t => {
  const from = Immutable({ foo: {bar: 'bas'} });
  const to = {foo: {bar: 'bas'}, beep: {boop: true}};
  const expected = from.set('beep', {boop: true});
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
  t.is(actual.foo, expected.foo);
});

test('works when removing properties', t => {
  const from = Immutable({foo: {bar: 'bas'}, beep: {boop: true}});
  const to = { foo: {bar: 'bas'} };
  const expected = from.without('beep');
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
  t.is(actual.foo, expected.foo);
});

test('works with undefined in to', t => {
  const from = Immutable({foo: {bar: 'bas'}, beep: undefined});
  const to = { foo: {bar: 'bas'}, beep: undefined };
  const expected = from;
  const actual = diff(from, to);

  t.is(actual, expected);
});

test('works when chaging object to none-object', t => {
  const from = Immutable({ foo: {bar: 'bas'} });
  const to = Immutable({ foo: true });
  const expected = from.set('foo', true);
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
  t.is(actual.foo, expected.foo);
});

test('arrays, where it previous was something else', t => {
  const from = Immutable({foo: null});
  const to = {foo: [1, 2, 3]};
  const expected = to;
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
});

test('arrays, change a property', t => {
  const from = Immutable([{foo: 'bar'}, {hello: 'world'}]);
  const to = [{foo: 'bas'}, {hello: 'world'}];
  const expected = to;
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
});

test('arrays, move a property', t => {
  const from = Immutable([{foo: 'bar'}, {hello: 'world'}]);
  const to = [{hello: 'world'}, {foo: 'bar'}];
  const expected = to;
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
});

test('arrays move', t => {
  const from = Immutable([1, 2]);
  const to = [2, 1];
  const expected = to;
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
});

test('arrays, reverse', t => {
  const from = Immutable([1, 2, 3, 4]);
  const to = [4, 3, 2, 1];
  const expected = to;
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
});

test('arras, move from the end to the begining', t => {
  const from = Immutable([1, 2, 3, 4, 'foo']);
  const to = ['foo', 1, 2, 3, 4];
  const expected = to;
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
});

test('arrays, update one value (special case)', t => {
  const from = Immutable([1, 2, {foo: {bar: true}}, 3, 4]);
  const to = [1, 2, {foo: {bar: true}, beep: 'boop'}, 3, 4];
  const expected = to;
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
  t.is(actual[2].foo, from[2].foo);
});

test('arrays, multiple adds', t => {
  const from = Immutable([1, 3]);
  const to = [1, 2, {foo: {bar: true}, beep: 'boop'}, 3, 4];
  const expected = to;
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
});

test('equal array', t => {
  const to = [1, 2, {foo: {bar: true}, beep: 'boop'}, 3, 4];
  const from = Immutable(to);
  const expected = to;
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
});

test('array remove', t => {
  const from = Immutable([1, 2, 3]);
  const to = [1, 2];
  const expected = to;
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
});

test('nested arrays', t => {
  const from = Immutable([[{nested: true}]]);
  const to = [[{nested: true}, {foo: 'bar'}]];
  const expected = to;
  const actual = diff(from, to);

  t.deepEqual(actual, expected);
});
