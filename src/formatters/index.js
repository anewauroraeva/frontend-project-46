import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (diff, formatName = 'stylish') => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error('Oops, something went wrong! Try supported format.');
  }
};

export default format;
