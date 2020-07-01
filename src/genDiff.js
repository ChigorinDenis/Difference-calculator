import _ from 'lodash';
import readFile from './utils.js';
import formatters from './formatters/index.js';

const buidTree = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after)).sort();
  const tree = keys.reduce((acc, key) => {
    if (!_.has(before, key) && _.has(after, key)) {
      const node = {
        name: key,
        value: after[key],
        type: 'added',
        children: [],
      };
      return [...acc, node];
    }
    if (_.has(before, key) && !_.has(after, key)) {
      const node = {
        name: key,
        value: before[key],
        type: 'deleted',
        children: [],
      };
      return [...acc, node];
    }
    const beforeItem = before[key];
    const afterItem = after[key];
    if (beforeItem === afterItem) {
      const node = {
        name: key,
        value: beforeItem,
        type: 'unmodified',
        children: [],
      };
      return [...acc, node];
    }
    if (typeof beforeItem === 'object' && typeof afterItem === 'object') {
      const node = {
        name: key,
        value: null,
        type: 'unmodified',
        children: [...buidTree(beforeItem, afterItem)],
      };
      return [...acc, node];
    }
    const node = {
      name: key,
      value: [beforeItem, afterItem],
      type: 'modified',
      children: [],
    };
    return [...acc, node];
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
