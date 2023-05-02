import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylish = readFileSync(path.resolve(process.cwd(), '__fixtures__/expected-stylish.txt'), 'utf-8');
const plain = readFileSync(path.resolve(process.cwd(), '__fixtures__/expected-plain.txt'), 'utf-8');
const json = readFileSync(path.resolve(process.cwd(), '__fixtures__/expected-json.txt'), 'utf-8');

const extensions = ['json', 'yml'];

test.each(extensions)('%s format', (extention) => {
  const file1 = getFixturePath(`file1.${extention}`);
  const file2 = getFixturePath(`file2.${extention}`);

  expect(genDiff(file1, file2)).toEqual(stylish);
  expect(genDiff(file1, file2, 'stylish')).toEqual(stylish);
  expect(genDiff(file1, file2, 'plain')).toEqual(plain);
  expect(genDiff(file1, file2, 'json')).toEqual(json);
});
