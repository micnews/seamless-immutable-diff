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

  t.same(actual.asMutable(), expected.asMutable());
  t.is(actual.foo, expected.foo);
});

test('works when chaging object to none-object', t => {
  const from = Immutable({ foo: {bar: 'bas'} });
  const to = Immutable({ foo: true });
  const expected = from.set('foo', true);
  const actual = diff(from, to);

  t.same(actual.asMutable(), expected.asMutable());
  t.is(actual.foo, expected.foo);
});

test('arrays, where it previous was something else', t => {
  const from = Immutable({foo: null});
  const to = {foo: [1, 2, 3]};
  const expected = to;
  const actual = diff(from, to).asMutable();

  t.same(actual, expected);
});

test('arrays, change a property', t => {
  const from = Immutable([{foo: 'bar'}, {hello: 'world'}]);
  const to = [{foo: 'bas'}, {hello: 'world'}];
  const expected = to;
  const actual = diff(from, to).asMutable();

  t.same(actual, expected);
});

test('arrays, move a property', t => {
  const from = Immutable([{foo: 'bar'}, {hello: 'world'}]);
  const to = [{hello: 'world'}, {foo: 'bar'}];
  const expected = to;
  const actual = diff(from, to).asMutable();

  t.same(actual, expected);
});

test('arrays, reverse', t => {
  const from = Immutable([1, 2, 3, 4]);
  const to = [4, 3, 2, 1];
  const expected = to;
  const actual = diff(from, to).asMutable();

  t.same(actual, expected);
});

test('arras, move from the end to the begining', t => {
  const from = Immutable([1, 2, 3, 4, 'foo']);
  const to = ['foo', 1, 2, 3, 4];
  const expected = to;
  const actual = diff(from, to).asMutable();

  t.same(actual, expected);
});
