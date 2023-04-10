import _ from 'lodash';

// const formatValue = (values, depth) => {
//   if (_.isObject(values)) {
//     const objectIndent = makeIndent(depth + 1);
//     const objectContent = Object
//       .entries(values)
//       .map(([key, value]) => `${objectIndent}${key}: ${formatValue(value, depth + 1)}`)
//       .join('\n');
//     return `{\n${objectContent}\n${makeIndent(depth)}}`;
//   }
//   return `${values}`;
// };

const stringify = (value, replacer = '  ') => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return String(currentValue);
    }
    const keyIndent = replacer.repeat(depth + 3);
    const bracketIndent = replacer.repeat(depth + 1);
    const lines = Object.entries(currentValue)
      .map(([key, val]) => `${keyIndent}${key}: ${iter(val, depth + 2)}`);

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, 1);
};

const stylish = (diff) => {
  const iter = (tree, depth) => tree.map((node) => {
    const space = '  ';
    const indent = space.repeat(depth);
    const bracketIndent = space.repeat(depth + 1);
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value)}`;
      case 'deleted':
        return `${indent}- ${node.key}: ${stringify(node.value)}`;
      case 'nested':
        return `${indent}  ${node.key}: ${['{', ...iter(node.value, depth + 2), `${bracketIndent}}`].join('\n')}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value)}`;
      case 'changed':
        return `${indent}- ${node.key}: ${stringify(node.value)}\n${indent}+ ${node.key}: ${stringify(node.value2)}`;
      default:
        return 'OOPS';
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default stylish;
