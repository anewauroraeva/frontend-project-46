/* eslint-disable no-param-reassign */
import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const fileData1 = readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const fileData2 = readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const parsedData1 = JSON.parse(fileData1);
  const parsedData2 = JSON.parse(fileData2);
  const keys1 = Object.keys(parsedData1);
  const keys2 = Object.keys(parsedData2);
  const commonKeys = _.union(keys1, keys2);
  const sortedCommonKeys = _.sortBy(commonKeys);

  // const differences = sortedCommonKeys.reduce((result, key) => {
  //   const absentKeyInData1 = `- ${key}`;
  //   const absentKeyInData2 = `+ ${key}`;
  //   const sameKey = `  ${key}`;
  //   if (!Object.hasOwn(parsedData1, key)) {
  //     result[absentKeyInData2] = parsedData2[key];
  //   } else if (!Object.hasOwn(parsedData2, key)) {
  //     result[absentKeyInData1] = parsedData1[key];
  //   } else if (parsedData1[key] !== parsedData2[key]) {
  //     result[absentKeyInData1] = parsedData1[key];
  //     result[absentKeyInData2] = parsedData2[key];
  //   } else {
  //     result[sameKey] = parsedData1[key];
  //   }
  //   return result;
  // }, {});

  const differences = sortedCommonKeys.reduce((result, key) => {
    if (!Object.hasOwn(parsedData1, key)) {
      result.splice(result.length, 0, `  + ${key}: ${parsedData2[key]}`);
    } else if (!Object.hasOwn(parsedData2, key)) {
      result.splice(result.length, 0, `  - ${key}: ${parsedData1[key]}`);
    } else if (parsedData1[key] !== parsedData2[key]) {
      result.splice(result.length, 0, `  - ${key}: ${parsedData1[key]}`);
      result.splice(result.length, 0, `  + ${key}: ${parsedData2[key]}`);
    } else {
      result.splice(result.length, 0, `    ${key}: ${parsedData1[key]}`);
    }
    return result;
  }, []);
  const strDiff = differences.join(',\n');
  return `{\n${strDiff}\n}`;
};

// You need to return:
// {
//   - follow: false
//     host: hexlet.io
//   - proxy: 123.234.53.22
//   - timeout: 50
//   + timeout: 20
//   + verbose: true
// }

export default genDiff;
