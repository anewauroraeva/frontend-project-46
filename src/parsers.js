import yaml from 'js-yaml';

const parseFile = (fileData, fileExt) => {
  switch (fileExt) {
    case '.json':
      return JSON.parse(fileData);
    case '.yaml':
    case '.yml':
      return yaml.load(fileData);
    default:
      throw new Error('Unknown extention');
  }
};

export default parseFile;
