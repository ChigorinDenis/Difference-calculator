const formatValue = (value) => (typeof value === 'object' ? '[ complex value ]' : value);

const formatPlainDiff = (tree, path = []) => {
  const formattedDiff = tree.flatMap((node) => {
    const {
      children,
      name,
      type,
      value,
    } = node;
    const nestedPath = [...path, name];
    switch (type) {
      case 'deleted':
        return `Property '${nestedPath.join('.')}' was deleted`;
      case 'added':
        return `Property '${nestedPath.join('.')}' was added with value: ${formatValue(value)}`;
      case 'modified': {
        const [beforeValue, afterValue] = value;
        return `Property '${nestedPath.join('.')}' was changed from ${formatValue(beforeValue)} to ${formatValue(afterValue)}`;
      }
      case 'unmodified':
        return formatPlainDiff(children, nestedPath);
      default:
        throw new Error(`Error! type : ${type} invalid`);
    }
  });
  return formattedDiff.filter((item) => item !== '').join('\n');
};

export default formatPlainDiff;
