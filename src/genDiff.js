import _ from 'lodash';
import readFile from './utils.js';
import format from './formatters/index.js';

const buildNode = (name, value, type) => ({
  name,
  value,
  type,
});

const buidTree = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after)).sort();
  const tree = keys.map((key) => {
    const beforeValue = before[key];
    const afterValue = after[key];
    if (!_.has(before, key)) {
      return buildNode(key, afterValue, 'added');
    }
    if (!_.has(after, key)) {
      return buildNode(key, beforeValue, 'deleted');
    }
    if (beforeValue === afterValue) {
      return buildNode(key, beforeValue, 'unmodified');
    }
    if (typeof beforeValue === 'object' && typeof afterValue === 'object') {
      const children = buidTree(beforeValue, afterValue);
      return {
        name: key,
        type: 'nested',
        children,
      };
    }
    return {
      name: key,
      type: 'modified',
      beforeValue,
      afterValue,
    };
  });
  return tree;
};

const genDiff = (filepath1, filepath2, formatName) => {
  const beforeContent = readFile(filepath1);
  const afterContent = readFile(filepath2);
  const tree = buidTree(beforeContent, afterContent);
  const form = format(formatName)(tree);
  return form;
};

export default genDiff;
