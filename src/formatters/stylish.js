/* eslint-disable max-len */
import _ from 'lodash';

const stringify = (value, depth, replacer = '    ') => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const keyIndent = replacer.repeat(depth + 1);
  const bracketIndent = replacer.repeat(depth);
  const lines = Object.entries(value)
    .map(([key, val]) => `${keyIndent}${key}: ${stringify(val, depth + 1)}`);
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (diff) => {
  const iter = (tree, depth) => tree.map((node) => {
    const replacer = '    ';
    const indent = replacer.repeat(depth);
    const bracketIndent = replacer.repeat(depth + 1);
    switch (node.type) {
      case 'added':
        return `${indent}  + ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'deleted':
        return `${indent}  - ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'nested':
        return `${indent}    ${node.key}: ${['{', ...iter(node.children, depth + 1), `${bracketIndent}}`].join('\n')}`;
      case 'unchanged':
        return `${indent}    ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return `${indent}  - ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${indent}  + ${node.key}: ${stringify(node.newValue, depth + 1)}`;
      default:
        throw new Error('Oops, something went wrong!');
    }
  });

  const stylishDiff = iter(diff, 0);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default stylish;
