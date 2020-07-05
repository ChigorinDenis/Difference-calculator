import _ from 'lodash';
import readFile from './utils.js';
import formatters from './formatters/index.js';

const buildNode = (name, value, type, children = []) => ({
  name,
  value,
  type,
  children,
});

const buidTree = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after)).sort();
  const tree = keys.reduce((acc, key) => {
    if (!_.has(before, key) && _.has(after, key)) {
      return [...acc, buildNode(key, after[key], 'added')];
    }
    if (_.has(before, key) && !_.has(after, key)) {
      return [...acc, buildNode(key, before[key], 'deleted')];
    }
    const beforeItem = before[key];
    const afterItem = after[key];
    if (beforeItem === afterItem) {
      return [...acc, buildNode(key, beforeItem, 'unmodified')];
    }
    if (typeof beforeItem === 'object' && typeof afterItem === 'object') {
      const children = [...buidTree(beforeItem, afterItem)];
      return [...acc, buildNode(key, null, 'unmodified', children)];
    }
    return [...acc, buildNode(key, [beforeItem, afterItem], 'modified')];
  }, []);
  return tree;
};

const genDiff = (filepath1, filepath2, formatName) => {
  const beforeFile = readFile(filepath1);
  const afterFile = readFile(filepath2);
  const tree = buidTree(beforeFile, afterFile);
  const toFormat = formatters(formatName);
  return toFormat(tree);
};

export default genDiff;
