import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const plain = (diff) => {
  const result = diff
    .filter((node) => node.type && node.type !== 'unchanged')
    .map((node) => {
      switch (node.type) {
        case 'nested':
          return plain(node.value);
        case 'added':
          return `Property '${node.key}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${node.key}' was removed`;
        case 'changed':
          return `Property '${node.key}' was updated. From ${stringify(node.value)} to ${stringify(node.value2)}`;
        default:
          return 'OOPS';
      }
    });

  return result.join('\n');
};

export default plain;
