/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import readFile from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

test('check reading file', () => {
  const before = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const result = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
      },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
    },
  };
  expect(readFile(path.join(getFixturePath('beforeRecursive.json')))).toEqual(result);
  expect(readFile(path.join(getFixturePath('beforeFlat.yml')))).toEqual(before);
  expect(readFile(path.join(getFixturePath('beforeRecursive.ini')))).toEqual(result);
});
