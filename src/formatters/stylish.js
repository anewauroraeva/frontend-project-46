/* eslint-disable max-len */
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

  return iter(value, 1);
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

/*
const space = ' ';
const spacesCount = 4;
const spacesToLeft = 2;

const unchangedKeyIndent = (depth) => space.repeat(depth * spacesCount);
const changedKeyIndent = (depth) => space.repeat(depth * spacesCount - spacesToLeft);
const bracketIndent = (depth) => space.repeat(depth * spacesCount - spacesCount);

const stringify = (value) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const lines = Object.entries(currentValue)
      .map(([key, val]) => `${unchangedKeyIndent(depth)}${key}: ${iter(val, depth + 1)}`);
    return ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
  };

  return iter(value, 2);
};

const stylish = (diff) => {
  const iter = (tree, depth) => tree.map((node) => {
    switch (node.type) {
      case 'added':
        console.log(stringify(node.value));
        return `${changedKeyIndent(depth)}+ ${node.key}: ${stringify(node.value)}`;
      case 'deleted':
        console.log(stringify(node.value));
        return `${changedKeyIndent(depth)}- ${node.key}: ${stringify(node.value)}`;
      case 'nested':
        return `${unchangedKeyIndent(depth)}${node.key}: ${['{', ...iter(node.value, depth + 1), `${bracketIndent(depth)}}`].join('\n')}`;
      case 'unchanged':
        return `${unchangedKeyIndent(depth)}${node.key}: ${stringify(node.value)}`;
      case 'changed':
        return `${changedKeyIndent(depth)}- ${node.key}: ${stringify(node.value)}\n${changedKeyIndent(depth)}+ ${node.key}: ${stringify(node.value2)}`;
      default:
        return 'OOPS';
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};
*/

export default stylish;
