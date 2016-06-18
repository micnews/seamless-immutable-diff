const isObj = obj => typeof obj === 'object' && obj !== null;

const keyObject = obj => {
  const body = Object.keys(obj).map(key => `${key}:${createKey(obj[key])}`).join(',');
  return `{${body}}`;
};
const keyArray = obj => {
  const body = obj.map(value => createKey(value)).join(',');
  return `[${body}]`;
};
const keyPrimitive = obj => typeof obj === 'string' ? `"${obj}"` : String(obj);
const createKey = obj => {
  return Array.isArray(obj)
    ? keyArray(obj)
    : isObj(obj)
    ? keyObject(obj)
    : keyPrimitive(obj);
};

export default createKey;
