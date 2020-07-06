const makeContent = (value) => (typeof value === 'object' ? '[ complex value ]' : value);
const makeDeletedString = (path) => (`Property '${path}' was deleted`);
const makeAddedString = (path, { value }) => (`Property '${path}' was added with value: ${makeContent(value)}`);
const makeModifiedString = (path, { value }) => {
  const [beforeValue, afterValue] = value;
  return `Property '${path}' was changed from ${makeContent(beforeValue)} to ${makeContent(afterValue)}`;
};
const makeUnmodifiedString = () => ('');

const createPlainString = (node, path) => {
  const { type } = node;
  const createFunc = {
    deleted: makeDeletedString,
    added: makeAddedString,
    modified: makeModifiedString,
    unmodified: makeUnmodifiedString,
  };
  return createFunc[type](path.join('.'), node);
};

const formatPlain = (tree, path = []) => {
  const formattedTree = tree.reduce((acc, node) => {
    const { children, name } = node;
    if (children.length !== 0) {
      return [...acc, ...formatPlain(children, [...path, name])];
    }
    const plainString = createPlainString(node, [...path, name]);
    return plainString === '' ? acc : [...acc, plainString];
  }, []);
  return formattedTree;
};

export default (tree) => (formatPlain(tree).join('\n'));
