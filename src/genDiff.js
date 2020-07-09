import _ from 'lodash';
import readFile from './utils.js';
import format from './formatters/index.js';

const buildNode = (name, value, type, children = []) => ({
  name,
  value,
  type,
  children,
});

const buidTree = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after)).sort();
  const tree = keys.map((key) => {
    if (!_.has(before, key)) {
      return buildNode(key, after[key], 'added');
    }
    if (!_.has(after, key)) {
      return buildNode(key, before[key], 'deleted');
    }
    const beforeItem = before[key];
    const afterItem = after[key];
    if (beforeItem === afterItem) {
      return buildNode(key, beforeItem, 'unmodified');
    }
    if (typeof beforeItem === 'object' && typeof afterItem === 'object') {
      const children = [...buidTree(beforeItem, afterItem)];
      return buildNode(key, null, 'unmodified', children);
    }
    return buildNode(key, [beforeItem, afterItem], 'modified');
  });
  return tree;
};

const genDiff = (filepath1, filepath2, formatName) => {
  const beforeFile = readFile(filepath1);
  const afterFile = readFile(filepath2);
  const tree = buidTree(beforeFile, afterFile);
  return format(formatName)(tree);
};

export default genDiff;
