/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

test('genDiff flat file formatted by stylish', () => {
  const diff = genDiff(getFixturePath('beforeFlat.yml'), getFixturePath('afterFlat.yml'), 'stylish');
  const result = fs.readFileSync(getFixturePath('diffFlat.txt'), 'utf-8');
  expect(diff).toBe(result);
});

test.each([
  ['beforeRecursive.json', 'afterRecursive.json'],
  ['beforeRecursive.ini', 'afterRecursive.ini'],
  ['beforeRecursive.yml', 'afterRecursive.yml'],
])('genDiff recursive file formatted by stylish(%s, %s)', (filename1, filename2) => {
  const expected = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');
  expect(genDiff(getFixturePath(filename1), getFixturePath(filename2), 'stylish')).toBe(expected);
});

test.each([
  ['beforeRecursive.json', 'afterRecursive.json'],
  ['beforeRecursive.ini', 'afterRecursive.ini'],
  ['beforeRecursive.yml', 'afterRecursive.yml'],
])('genDiff recursive file formatted by plain(%s, %s)', (filename1, filename2) => {
  const expected = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
  expect(genDiff(getFixturePath(filename1), getFixturePath(filename2), 'plain')).toBe(expected);
});

test.each([
  ['beforeRecursive.json', 'afterRecursive.json'],
  ['beforeRecursive.ini', 'afterRecursive.ini'],
  ['beforeRecursive.yml', 'afterRecursive.yml'],
])('genDiff recursive file formatted by json(%s, %s)', (filename1, filename2) => {
  const expected = fs.readFileSync(getFixturePath('json.txt'), 'utf-8');
  expect(genDiff(getFixturePath(filename1), getFixturePath(filename2), 'json')).toBe(expected);
});
