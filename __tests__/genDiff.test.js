/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const stylish = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');
const plain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
const json = fs.readFileSync(getFixturePath('json.txt'), 'utf-8');

test.each([
  ['before.json', 'after.json'],
  ['before.ini', 'after.ini'],
  ['before.yml', 'after.yml'],
])('check working genDiff formatted(stylish, plain, json) (%s, %s)', (filename1, filename2) => {
  expect(genDiff(getFixturePath(filename1), getFixturePath(filename2), 'stylish')).toBe(stylish);
  expect(genDiff(getFixturePath(filename1), getFixturePath(filename2), 'plain')).toBe(plain);
  expect(genDiff(getFixturePath(filename1), getFixturePath(filename2), 'json')).toBe(json);
});
