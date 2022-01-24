import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);
const stringify = (obj, treeDepth) => {
  if (!_.isPlainObject(obj)) {
    return `${obj}`;
  }
  if (obj === null) {
    return null;
  }
  const lines = Object.entries(obj).map(([key, value]) => `${indent(treeDepth + 1)}  ${key}: ${stringify(value, treeDepth + 1)}`);
  return ['{', ...lines, `${indent(treeDepth)}  }`].join('\n');
};
const stylish = (innerTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    const getValue = (value, sign) => `${indent(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.type) {
      case 'add':
        return getValue(node.val, '+');
      case 'remove':
        return getValue(node.val, '-');
      case 'same':
        return getValue(node.val, ' ');
      case 'updated':
        return `${getValue(node.val1, '-')}${getValue(node.val2, '+')}`;
      case 'nested':
        return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
      default:
        throw new Error(`Типа ${node.type} не существует: `);
    }
  });
  return `{\n${iter(innerTree, 1).join('')}}`;
};

export default stylish;
