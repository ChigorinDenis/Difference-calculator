const formatObj = (obj, space) => {
  const increaseSpace = 4;
  const str = Object.entries(obj)
    .reduce((acc, [key, value]) => (
      `${acc}${' '.repeat(space + increaseSpace)}${key}: ${value}\n`
    ), '');
  return `{\n${str}${' '.repeat(space)}}`;
};

const formatStylish = (tree, space = 2) => {
  const increaseSpace = 2;
  const str = tree
    .reduce((acc, node) => {
      const {
        name,
        type,
        value,
        children,
      } = node;
      if (type === 'added') {
        const content = typeof value === 'object' ? formatObj(value, space + increaseSpace) : value;
        return `${acc}${' '.repeat(space)}+ ${name}: ${content}\n`;
      }
      if (type === 'deleted') {
        const content = typeof value === 'object' ? formatObj(value, space + increaseSpace) : value;
        return `${acc}${' '.repeat(space)}- ${name}: ${content}\n`;
      }
      if (type === 'modified') {
        const [before, after] = value;
        const contentBefore = typeof before === 'object' ? formatObj(before, space + increaseSpace) : before;
        const contentAfter = typeof after === 'object' ? formatObj(after, space + increaseSpace) : after;
        return `${acc}${' '.repeat(space)}- ${name}: ${contentBefore}\n${' '.repeat(space)}+ ${name}: ${contentAfter}\n`;
      }
      if (type === 'unmodified') {
        const content = children.length !== 0 ? `{\n${formatStylish(children, space + 4)}${' '.repeat(space + increaseSpace)}}` : value;
        return `${acc}${' '.repeat(space)}  ${name}: ${content}\n`;
      }
      return acc;
    }, '');
  return str;
};

export default (tree) => (`{\n${formatStylish(tree)}}`);
