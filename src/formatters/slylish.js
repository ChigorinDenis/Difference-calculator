const formatObj = (obj, space) => {
  const increaseSpace = 4;
  const str = Object.entries(obj)
    .reduce((acc, [key, value]) => (
      `${acc}${' '.repeat(space + increaseSpace)}${key}: ${value}\n`
    ), '');
  return `{\n${str}${' '.repeat(space)}}`;
};

const makeContent = (value, space) => {
  const increaseSpace = 2;
  return typeof value === 'object' ? formatObj(value, space + increaseSpace) : value;
};
const makeAddedString = (node, space) => {
  const { value, name } = node;
  return `${' '.repeat(space)}+ ${name}: ${makeContent(value, space)}\n`;
};
const makeDeletedString = (node, space) => {
  const { value, name } = node;
  return `${' '.repeat(space)}- ${name}: ${makeContent(value, space)}\n`;
};
const makeModifiedString = (node, space) => {
  const { value, name } = node;
  const [before, after] = value;
  const contentBefore = makeContent(before, space);
  const contentAfter = makeContent(after, space);
  return `${' '.repeat(space)}- ${name}: ${contentBefore}\n${' '.repeat(space)}+ ${name}: ${contentAfter}\n`;
};
const makeUnmodifiedString = (node, space, fn) => {
  const increaseSpace = 2;
  const { value, name, children } = node;
  const content = children.length !== 0 ? `{\n${fn(children, space + 4)}${' '.repeat(space + increaseSpace)}}` : value;
  return `${' '.repeat(space)}  ${name}: ${content}\n`;
};

const createStylishString = (node, space, fn) => {
  const { type } = node;
  const createFunc = {
    deleted: makeDeletedString,
    added: makeAddedString,
    modified: makeModifiedString,
    unmodified: makeUnmodifiedString,
  };
  return createFunc[type](node, space, fn);
};

const formatStylish = (tree, space = 2) => {
  const formattedTree = tree
    .reduce((acc, node) => (`${acc}${createStylishString(node, space, formatStylish)}`), '');
  return formattedTree;
};

export default (tree) => (`{\n${formatStylish(tree)}}`);
