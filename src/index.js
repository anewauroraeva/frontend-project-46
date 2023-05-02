import { readFileSync } from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const fileData2 = readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const fileExt1 = path.extname(filepath1);
  const fileExt2 = path.extname(filepath2);
  const parcedData1 = parseFile(fileData1, fileExt1);
  const parcedData2 = parseFile(fileData2, fileExt2);

  const diff = buildDiff(parcedData1, parcedData2);
  return format(diff, formatName);
};

export default genDiff;
