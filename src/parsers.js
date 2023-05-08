import yaml from 'js-yaml';

const parseFile = (data, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`Extention ${ext} is not supported.`);
  }
};

export default parseFile;
