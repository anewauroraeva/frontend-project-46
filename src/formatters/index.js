import stylish from './stylish.js';
import plain from './plain.js';

const format = (diff, formatName = 'stylish') => {
  if (formatName === 'plain') {
    return plain(diff);
  }
  return stylish(diff);
};

export default format;
