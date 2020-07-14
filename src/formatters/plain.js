const formatValue = (value) => (typeof value === 'object' ? '[ complex value ]' : value);

const formatPlainDiff = (tree) => {
  const iter = (data, parentNodes = []) => {
    const formattedDiff = data.flatMap((node) => {
      const {
        children,
        name,
        type,
        value,
        beforeValue,
        afterValue,
      } = node;
      const nestedNodes = [...parentNodes, name];
      switch (type) {
        case 'deleted':
          return `Property '${nestedNodes.join('.')}' was deleted`;
        case 'added':
          return `Property '${nestedNodes.join('.')}' was added with value: ${formatValue(value)}`;
        case 'modified': {
          return `Property '${nestedNodes.join('.')}' was changed from ${formatValue(beforeValue)} to ${formatValue(afterValue)}`;
        }
        case 'unmodified':
          return '';
        case 'nested':
          return iter(children, nestedNodes);
        default:
          throw new Error(`Error! type : ${type} invalid`);
      }
    });
    return formattedDiff.filter((item) => item !== '').join('\n');
  };
  return iter(tree);
};

export default formatPlainDiff;
