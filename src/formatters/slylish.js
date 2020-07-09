const formatObj = (obj, space) => {
  const increaseSpace = 4;
  const formattedObj = Object.entries(obj)
    .map(([key, value]) => (`${' '.repeat(space + increaseSpace)}${key}: ${value}\n`));
  return `{\n${formattedObj.join('\n')}${' '.repeat(space)}}`;
};

const formatValue = (value, space) => (typeof value === 'object' ? formatObj(value, space) : value);

const formatStylishDiff = (tree, space = 2) => {
  const increaseSpace = 2;
  const objectSpace = space + increaseSpace;
  const formattedTree = tree
    .map((node) => {
      const {
        name,
        type,
        value,
        children,
      } = node;
      switch (type) {
        case 'deleted':
          return `${' '.repeat(space)}- ${name}: ${formatValue(value, objectSpace)}`;
        case 'added':
          return `${' '.repeat(space)}+ ${name}: ${formatValue(value, objectSpace)}`;
        case 'modified': {
          const [before, after] = value;
          return `${' '.repeat(space)}- ${name}: ${formatValue(before, objectSpace)}\n${' '.repeat(space)}+ ${name}: ${formatValue(after, objectSpace)}`;
        }
        case 'unmodified': {
          const content = value === null ? `${formatStylishDiff(children, space + 4)}` : value;
          return `${' '.repeat(space)}  ${name}: ${content}`;
        }
        default:
          throw new Error(`Error! type : ${type} invalid`);
      }
    });
  return `{\n${formattedTree.join('\n')}\n${' '.repeat(space - increaseSpace)}}`;
};

export default formatStylishDiff;
