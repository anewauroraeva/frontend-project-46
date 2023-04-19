import { readFileSync } from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const fileData2 = readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const parcedData1 = parseFile(filepath1, fileData1);
  const parcedData2 = parseFile(filepath2, fileData2);

  const diff = buildDiff(parcedData1, parcedData2);
  return format(diff, formatName);
};

export default genDiff;
