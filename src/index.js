import { readFileSync } from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const fileData1 = readFileSync(filepath1, 'utf-8');
  const fileData2 = readFileSync(filepath2, 'utf-8');
  const parsedData1 = JSON.parse(fileData1);
  const parsedData2 = JSON.parse(fileData2);
  console.log(parsedData1);
  const keys1 = Object.keys(parsedData1);
  const keys2 = Object.keys(parsedData2);
  console.log(keys1);
  const commonKeys = _.union(keys1, keys2);
  const sortedCommonKeys = _.sortBy(commonKeys);
 
  const differences = sortedCommonKeys.reduce((result, key) => {
    const absentKeyInData1 = `- ${key}`;
    const absentKeyInData2 = `+ ${key}`;
    const sameKey = `  ${key}`;
    if (!Object.hasOwn(parsedData1, key)) {
      result[absentKeyInData2] = parsedData2[key];
    } else if (!Object.hasOwn(parsedData2, key)) {
      result[absentKeyInData1] = parsedData1[key];
    } else if (parsedData1[key] !== parsedData2[key]) {
      result[absentKeyInData1] = parsedData1[key];
      result[absentKeyInData2] = parsedData2[key];
    } else {
      result[sameKey] = parsedData1[key];
    }
    return result;
  }, {});

  console.log(differences);

  // let strDiff = JSON.stringify(differences);
  // strDiff.replace('"', '');
  // console.log(strDiff);
  // return strDiff;
};

/*
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
*/

export default genDiff;
