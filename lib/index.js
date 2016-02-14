
const isObj = (obj) => typeof obj === 'object' && obj !== null;

const walk = (from, to, path) => {
  let result = from;

  Object.keys(to).forEach((key, index) => {
    if (!isObj(to[key])) {
      result = result.setIn(path.concat(key), to[key]);
    } else {
      result = walk(result, to[key], path.concat(key));
    }
  });

  return result;
};

const diff = (from, to) => {
  if (!(from && from.asMutable)) {
    throw new Error('"from" property must be a seamless-immutable Object');
  }

  return walk(from, to, []);
};

module.exports = diff;
