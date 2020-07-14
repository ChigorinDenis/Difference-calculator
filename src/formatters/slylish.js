const formatObj = (obj, space) => {
  const increaseSpace = 4;
  const formattedObj = Object.entries(obj)
    .map(([key, value]) => (`${' '.repeat(space + increaseSpace)}${key}: ${value}\n`));
  return `{\n${formattedObj.join('\n')}${' '.repeat(space)}}`;
};

const formatValue = (value, space) => (typeof value === 'object' ? formatObj(value, space) : value);

const formatStylishDiff = (tree) => {
  const iter = (data, depth) => {
    const indent = 2;
    const space = depth * indent;
    const formattedTree = data
      .map((node) => {
        const {
          name,
          type,
          value,
          beforeValue,
          afterValue,
          children,
        } = node;
        switch (type) {
          case 'deleted':
            return `${' '.repeat(space)}- ${name}: ${formatValue(value, space + indent)}`;
          case 'added':
            return `${' '.repeat(space)}+ ${name}: ${formatValue(value, space + indent)}`;
          case 'modified': {
            return `${' '.repeat(space)}- ${name}: ${formatValue(beforeValue, space + indent)}\n${' '.repeat(space)}+ ${name}: ${formatValue(afterValue, space + indent)}`;
          }
          case 'unmodified': {
            return `${' '.repeat(space)}  ${name}: ${value}`;
          }
          case 'nested': {
            return `${' '.repeat(space)}  ${name}: ${iter(children, depth + 2)}`;
          }
          default:
            throw new Error(`Error! type : ${type} invalid`);
        }
      });
    return `{\n${formattedTree.join('\n')}\n${' '.repeat(space - 2)}}`;
  };
  return iter(tree, 1);
};

export default formatStylishDiff;
