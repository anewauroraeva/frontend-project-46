const stylish = (diff) => {
  const iter = (currentDiff, depth) => {
    const space = ' ';
    const spacesCount = 2;
    const indentSize = depth * spacesCount;
    const currentIndent = space.repeat(indentSize);
    const lines = currentDiff.map((node) => {
      switch (node.type) {
        case 'added':
          return `${currentIndent}+ ${node.key}: ${node.value}`;
        case 'deleted':
          return `${currentIndent}- ${node.key}: ${node.value}`;
        case 'nested':
          return `${currentIndent}${node.key}: {\n ${iter(node.value, depth + 1)}\n    }`;
        case 'unchaged':
          return `${currentIndent}  ${node.key}: ${node.value}`;
        case 'changed':
          return `${currentIndent}- ${node.key}: ${node.value1}\n${currentIndent}+ ${node.key}: ${node.value2}`;
        default:
          return `${currentIndent}  ${node.key}: ${node.value}`;
      }
    });
    return [
      '{',
      ...lines,
      '}',
    ].join('\n');
  };

  return iter(diff, 2);
};

export default stylish;
