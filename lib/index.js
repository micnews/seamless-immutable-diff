
const isObj = (obj) => typeof obj === 'object' && obj !== null;

const walk = (from, to) => {
  let result = from;

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
