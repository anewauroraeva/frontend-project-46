// import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const filepath3 = getFixturePath('filepath1.yml');
const filepath4 = getFixturePath('filepath2.yml');

const stylish = readFileSync(path.resolve(process.cwd(), '__fixtures__/expected-stylish.txt'), 'utf-8');

test('JSON flat files', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(stylish);
});

test('YAML flat files', () => {
  expect(genDiff(filepath3, filepath4)).toEqual(stylish);
});
