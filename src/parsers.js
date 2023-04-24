import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filepath, fileData) => {
  const fileExt = path.extname(filepath);
  if (fileExt === '.json') return JSON.parse(fileData);

  return yaml.load(fileData);
};

export default parseFile;
