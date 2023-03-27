import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filepath, fileData) => {
  const fileExt = path.extname(filepath);
  let parsedFile;
  if (fileExt === '.json') {
    parsedFile = JSON.parse(fileData);
  } else {
    parsedFile = yaml.load(fileData);
  }

  return parsedFile;
};

export default parseFile;
