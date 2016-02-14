
import dift, {CREATE, MOVE, REMOVE} from 'dift';
import {splice} from 'immutable-array-methods';

const isObj = (obj) => typeof obj === 'object' && obj !== null;
const key = (obj) => JSON.stringify(obj);

const walk = (from, to) => {
  let result = from;

  if (Array.isArray(to)) {
    if (!Array.isArray(from)) {
      return to;
    }

    dift(from, to, (type, prev, next, pos) => {
      if (type === CREATE) {
        result = splice(result, pos, 0, next);
      } else if (type === MOVE) {
        let oldPos = result.indexOf(prev);

        result = splice(result, pos, 0, prev);
        result = splice(result, oldPos < pos ? oldPos : oldPos + 1, 1);
      } else if (type === REMOVE) {
        pos = result.indexOf(prev);
        result = splice(result, pos, 1);
      }
    }, key);
    return result;
  }

  const toKeys = Object.keys(to);
  toKeys.forEach((key) => {
    if (!isObj(to[key])) {
      result = result.set(key, to[key]);
    } else {
      if (!isObj(result[key])) {
        result = result.set(key, {});
      }
      result = result.set(key, walk(result[key], to[key]));
    }
  });

  Object.keys(from).forEach(key => {
    if (toKeys.indexOf(key) === -1) {
      result = result.without(key);
    }
  });

  return result;
};

const diff = (from, to) => {
  if (!(from && from.asMutable)) {
    throw new Error('"from" property must be a seamless-immutable Object');
  }

  return walk(from, to);
};

module.exports = diff;
