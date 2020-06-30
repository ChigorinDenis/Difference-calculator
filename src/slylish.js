const printObj = (obj, depth) => {
  const str = Object.entries(obj)
    .reduce((acc, [key, value]) => (
      `${acc}${' '.repeat(depth + 4)}${key}: ${value}\n`
    ), '');
  return `{\n${str}${' '.repeat(depth)}}`;
};


const displayFormat = (tree, depth = 2) => {
  const str = tree
    .reduce((acc, node) => {
      const {
        name,
        type,
        value,
        children,
      } = node;
      if (type === 'added') {
        const content = typeof value === 'object' ? printObj(value, depth + 2) : value;
        return `${acc}${' '.repeat(depth)}+ ${name}: ${content}\n`;
      }
      if (type === 'deleted') {
        const content = typeof value === 'object' ? printObj(value, depth + 2) : value;
        return `${acc}${' '.repeat(depth)}- ${name}: ${content}\n`;
      }
      if (type === 'modified') {
        const [before, after] = value;
        const contentBefore = typeof before === 'object' ? printObj(before, depth + 2) : before;
        const contentAfter = typeof after === 'object' ? printObj(after, depth + 2) : after;
        return `${acc}${' '.repeat(depth)}- ${name}: ${contentBefore}\n${' '.repeat(depth)}+ ${name}: ${contentAfter}\n`;
      }
      if (type === 'unmodified') {
        const content = children.length !== 0 ? `{\n${displayFormat(children, depth + 4)}${' '.repeat(depth + 2)}}` : value;
        return `${acc}${' '.repeat(depth)}  ${name}: ${content}\n`;
      }
      return acc;
    }, '');
  return str;
};

export default (tree, depth) => (`{\n${displayFormat(tree, depth)}}`);
