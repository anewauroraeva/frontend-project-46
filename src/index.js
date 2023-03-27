import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parseFile from './parsers.js';

const genDiff = (filepath1, filepath2) => { // здесь нужен будет 3ий параметр с форматом вывода
  console.log(path.resolve(process.cwd(), filepath1));
  const fileData1 = readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const fileData2 = readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const parcedData1 = parseFile(filepath1, fileData1);
  const parcedData2 = parseFile(filepath2, fileData2);
  const keys1 = Object.keys(parcedData1);
  const keys2 = Object.keys(parcedData2);
  const commonKeys = _.union(keys1, keys2);
  const sortedCommonKeys = _.sortBy(commonKeys);
  const differences = sortedCommonKeys.reduce((result, key) => {
    if (!Object.hasOwn(parcedData1, key)) {
      result.splice(result.length, 0, `  + ${key}: ${parcedData2[key]}`);
    } else if (!Object.hasOwn(parcedData2, key)) {
      result.splice(result.length, 0, `  - ${key}: ${parcedData1[key]}`);
    } else if (parcedData1[key] !== parcedData2[key]) {
      result.splice(result.length, 0, `  - ${key}: ${parcedData1[key]}`);
      result.splice(result.length, 0, `  + ${key}: ${parcedData2[key]}`);
    } else {
      result.splice(result.length, 0, `    ${key}: ${parcedData1[key]}`);
    }
    return result;
  }, []);
  const strDiff = differences.join('\n');
  return `{\n${strDiff}\n}`;
};

export default genDiff;
