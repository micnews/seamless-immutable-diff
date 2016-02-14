
import dift, {CREATE, UPDATE, MOVE, REMOVE} from 'dift';
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
        result = splice(result, pos, 0, to[pos]);
      } else if (type === MOVE) {
        let oldPos = result.indexOf(prev);

        if (oldPos !== pos) {
          result = splice(result, pos, 0, prev);
          result = splice(result, oldPos < pos ? oldPos : oldPos + 1, 1);
        }
      } else if (type === REMOVE) {
        pos = result.indexOf(prev);
        result = splice(result, pos, 1);
      }
    }, key);
    return result;
  }

  Object.keys(to).forEach((key, index) => {
    if (!isObj(to[key])) {
      result = result.set(key, to[key]);
    } else {
      if (!isObj(result[key])) {
        result = result.set(key, {});
      }
      result = result.set(key, walk(result[key], to[key]));
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
