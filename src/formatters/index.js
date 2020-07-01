import formatStylish from './slylish.js';
import formatPlain from './plain.js';
import toJSON from './toJSON.js';

export default (formatName) => {
  const formatters = {
    plain: formatPlain,
    stylish: formatStylish,
    json: toJSON,
  };
  return formatters[formatName];
};
