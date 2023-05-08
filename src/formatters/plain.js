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

const plain = (diff, path = '') => {
  const result = diff
    .filter((node) => node.type && node.type !== 'unchanged')
    .map((node) => {
      const fullPath = path === '' ? `${node.key}` : `${path}.${node.key}`;
      switch (node.type) {
        case 'nested':
          return plain(node.children, fullPath);
        case 'added':
          return `Property '${fullPath}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${fullPath}' was removed`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
        default:
          throw new Error(`Type '${node.type}' is not supported.`);
      }
    });

  return result.join('\n');
};

export default plain;
