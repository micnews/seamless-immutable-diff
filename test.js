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
