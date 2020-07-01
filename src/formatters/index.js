import formatStylish from './slylish.js';
import formatPlain from './plain.js';

export default (formatName) => {
  const formatters = {
    plain: formatPlain,
    stylish: formatStylish,
  };
  return formatters[formatName];
};
