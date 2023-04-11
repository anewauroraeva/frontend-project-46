import _ from 'lodash';

const stringify = (value, replacer = '    ') => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const keyIndent = replacer.repeat(depth + 1);
    const bracketIndent = replacer.repeat(depth);
    const lines = Object.entries(currentValue)
      .map(([key, val]) => `${keyIndent}${key}: ${iter(val, depth + 1)}`);
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, 0);
};

const stylish = (diff) => {
  const iter = (tree, depth) => tree.map((node) => {
    const replacer = '    ';
    const indent = replacer.repeat(depth);
    const bracketIndent = replacer.repeat(depth + 1);
    switch (node.type) {
      case 'added':
        return `${indent}  + ${node.key}: ${stringify(node.value)}`;
      case 'deleted':
        return `${indent}  - ${node.key}: ${stringify(node.value)}`;
      case 'nested':
        return `${indent}    ${node.key}: ${['{', ...iter(node.value, depth + 1), `${bracketIndent}}`].join('\n')}`;
      case 'unchanged':
        return `${indent}    ${node.key}: ${stringify(node.value)}`;
      case 'changed':
        return `${indent}  - ${node.key}: ${stringify(node.value)}\n${indent}  + ${node.key}: ${stringify(node.value2)}`;
      default:
        return 'OOPS';
    }
  });

  const stylishDiff = iter(diff, 0);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default stylish;
